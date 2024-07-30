import { useRecoilValue } from "recoil";

import { LoadingAnimation } from "#/components/loading-animation";

import { authInitializedAtom } from "#/recoil/auth-initialized";

export const AuthLoading = ({ children }: { children: JSX.Element }) => {
  const isAuthInitialized = useRecoilValue(authInitializedAtom);

  if (!isAuthInitialized) {
    return <LoadingAnimation />;
  } else {
    return children;
  }
};
