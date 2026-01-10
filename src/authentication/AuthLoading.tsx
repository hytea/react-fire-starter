import { useRecoilValue } from "recoil";
import type { ReactNode } from "react";

import { LoadingAnimation } from "#/components/loading-animation";

import { authInitializedAtom } from "#/recoil/auth-initialized";

export const AuthLoading = ({ children }: { children: ReactNode }) => {
  const isAuthInitialized = useRecoilValue(authInitializedAtom);

  if (!isAuthInitialized) {
    return <LoadingAnimation />;
  } else {
    return children;
  }
};
