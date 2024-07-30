import { FirebaseError as FBError } from "firebase/app";
import {
  GoogleAuthProvider as GoogleAuth,
  browserLocalPersistence as LocalPersist,
  browserSessionPersistence as SessionPersist,
  confirmPasswordReset as fbConfirmPasswordReset,
  createUserWithEmailAndPassword as fbCreateUser,
  sendPasswordResetEmail as fbSendPasswordReset,
  signInWithEmailAndPassword as fbSignIn,
  signInWithPopup as fbSignInPopup,
  getAuth as initializeAuth,
} from "firebase/auth";
import { useEffect as useComponentEffect } from "react";
import { useSetRecoilState as setRecoilState } from "recoil";

import { AuthError as AppAuthError } from "#/errors/AuthError";
import { fbApp } from "#/firebaseConfig";
import { authInitializedAtom as initializedAtom } from "#/recoil/auth-initialized";
import { authUserLoadedAtom as userLoadedAtom } from "#/recoil/auth-user-loaded";

export { AuthErrorCodes } from "firebase/auth";
export type { User } from "firebase/auth";

const authInstance = initializeAuth(fbApp);
const googleAuthProviderInstance = new GoogleAuth();

function detectAuthError(error: FBError) {
  return error.code.includes("auth/");
}

export function AuthInitializer() {
  const setInitialized = setRecoilState(initializedAtom);
  const setUserLoaded = setRecoilState(userLoadedAtom);

  useComponentEffect(() => {
    const unsubscribe = authInstance.onAuthStateChanged(async () => {
      await setInitialized(true);

      const currentUser = getUser();
      if (currentUser) {
        await setUserLoaded(true);
      }
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return null;
}

export async function confirmNewPassword(oobCode: string, newPassword: string) {
  try {
    await fbConfirmPasswordReset(authInstance, oobCode, newPassword);
  } catch (error) {
    if (error instanceof FBError && detectAuthError(error)) {
      throw new AppAuthError(error.code);
    } else {
      throw error;
    }
  }
}

export function getUser() {
  return authInstance.currentUser;
}

export async function sendResetPasswordEmail(email: string) {
  try {
    await fbSendPasswordReset(authInstance, email);
  } catch (error) {
    if (error instanceof FBError && detectAuthError(error)) {
      throw new AppAuthError(error.code);
    } else {
      throw error;
    }
  }
}

export async function setAuthPersistence(persistence: string | null) {
  try {
    switch (persistence) {
      case "session":
        await authInstance.setPersistence(SessionPersist);
        break;
      default:
        await authInstance.setPersistence(LocalPersist);
        break;
    }
  } catch (error) {
    if (error instanceof FBError && detectAuthError(error)) {
      throw new AppAuthError(error.code);
    } else {
      throw error;
    }
  }
}

export async function userSignInWithEmail(email: string, password: string) {
  try {
    await fbSignIn(authInstance, email, password);
  } catch (error) {
    if (error instanceof FBError && detectAuthError(error)) {
      throw new AppAuthError(error.code);
    } else {
      throw error;
    }
  }
}

export async function userSignInWithGoogle() {
  try {
    await fbSignInPopup(authInstance, googleAuthProviderInstance);
  } catch (error) {
    if (error instanceof FBError && detectAuthError(error)) {
      throw new AppAuthError(error.code);
    } else {
      throw error;
    }
  }
}

export async function userSignOut() {
  try {
    await authInstance.signOut();
  } catch (error) {
    if (error instanceof FBError && detectAuthError(error)) {
      throw new AppAuthError(error.code);
    } else {
      throw error;
    }
  }
}

export async function userSignUpWithEmail(email: string, password: string) {
  try {
    await fbCreateUser(authInstance, email, password);
  } catch (error) {
    if (error instanceof FBError && detectAuthError(error)) {
      throw new AppAuthError(error.code);
    } else {
      throw error;
    }
  }
}
