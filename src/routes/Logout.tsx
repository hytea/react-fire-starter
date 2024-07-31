import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { userSignOut as signOutAuth } from "#/authentication/Authenticate";

import { useNotification } from "#/components/notification/NotificationContext";

import { AuthError } from "#/errors/AuthError";
import { useResetApplicationState } from "#/hooks/useResetAppState";
import { authInitializedAtom } from "#/recoil/auth-initialized";

export function Logout() {
  const isAuthInitialized = useRecoilValue(authInitializedAtom);
  const navigateTo = useNavigate();
  const resetAppCache = useResetApplicationState();
  const { addNotification } = useNotification();
  const isMounted = useRef(false);

  useEffect(() => {
    const performSignOut = async () => {
      if (isAuthInitialized && !isMounted.current) {
        isMounted.current = true; // Set the flag to true to prevent multiple runs
        try {
          await signOutAuth();
          await resetAppCache();
          addNotification({
            title: "Logout",
            details: "You have successfully logged out",
            image: "https://i.imgur.com/mcFjCci.png",
          });
          navigateTo("/auth/login", { replace: true });
        } catch (error) {
          if (error instanceof AuthError) {
            addNotification({
              title: `Logout Error ${error.number}`,
              details: `${error.message}`,
              image: "https://i.imgur.com/9qbsgWc.png",
            });
          } else {
            throw error;
          }
        }
      }
    };

    performSignOut();
  }, [isAuthInitialized, resetAppCache, navigateTo, addNotification]);

  return null;
}
