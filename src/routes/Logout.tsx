import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { userSignOut as signOutAuth } from "#/authentication/Authenticate";

import { AuthError } from "#/errors/AuthError";
import { useResetApplicationState } from "#/hooks/useResetAppState";
import { authInitializedAtom } from "#/recoil/auth-initialized";

export function Logout() {
  const isAuthInitialized = useRecoilValue(authInitializedAtom);
  const navigateTo = useNavigate();
  const resetAppCache = useResetApplicationState();

  useEffect(() => {
    const performSignOut = async () => {
      if (isAuthInitialized) {
        try {
          await signOutAuth();
          await resetAppCache();
          navigateTo("/auth/login", { replace: true });
        } catch (error) {
          if (error instanceof AuthError) {
            alert(
              `Sign out Error: ${error.message} Error Code: ${error.number}`,
            );
          } else {
            throw error;
          }
        }
      }
    };

    performSignOut();
  }, [isAuthInitialized, resetAppCache, navigateTo]);

  return null;
}
