import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { authInitializedAtom } from "#/recoil/auth-initialized";
import { authUserLoadedAtom } from "#/recoil/auth-user-loaded";

export function Public() {
  const navigateTo = useNavigate();
  const location = useLocation();
  const authInitialized = useRecoilValue(authInitializedAtom);
  const userLoaded = useRecoilValue(authUserLoadedAtom);

  useEffect(() => {
    if (authInitialized && userLoaded) {
      const continueTo = sessionStorage.getItem("continueTo");

      if (continueTo) {
        sessionStorage.removeItem("continueTo");
        navigateTo(continueTo);
      } else {
        if (
          location.pathname === "/auth/confirm-email" ||
          location.pathname === "/auth/reset-password"
        ) {
          return;
        }

        navigateTo("/");
      }
    }
  }, [userLoaded, authInitialized]);

  return (
    <div className="public-page" style={{ width: "100%" }}>
      <Outlet />
    </div>
  );
}
