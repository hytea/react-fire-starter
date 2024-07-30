import { useEffect as useComponentEffect } from "react";
import {
  useLocation as useRouteLocation,
  useNavigate as useRouterNavigate,
} from "react-router-dom";
import { useRecoilValue as useRecoilStateValue } from "recoil";

import { getUser } from "#/authentication/Authenticate";

import { authInitializedAtom as authStateInitialized } from "#/recoil/auth-initialized";

export function RequireAuthentication({ children }: { children: JSX.Element }) {
  const authenticatedUser = getUser();
  const currentLocation = useRouteLocation();
  const isAuthenticationInitialized = useRecoilStateValue(authStateInitialized);
  const navigateTo = useRouterNavigate();

  useComponentEffect(() => {
    if (isAuthenticationInitialized) {
      if (!authenticatedUser && currentLocation.pathname !== "/logout") {
        navigateTo("/auth/login", {
          state: { continueTo: currentLocation },
          replace: true,
        });
      }
    }
  }, [authenticatedUser, currentLocation, isAuthenticationInitialized]);

  return children;
}
