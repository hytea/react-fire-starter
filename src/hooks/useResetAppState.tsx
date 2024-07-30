import { useResetRecoilState as resetRecoil } from "recoil";

import { authInitializedAtom as initAuthState } from "#/recoil/auth-initialized";

export function useResetApplicationState() {
  const resetAuthState = resetRecoil(initAuthState);

  const resetAppState = async () => {
    await resetAuthState();
  };

  return resetAppState;
}
