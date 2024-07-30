import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  userSignInWithEmail as emailSignIn,
  userSignInWithGoogle as googleSignIn,
} from "#/authentication/Authenticate";

import { AuthError } from "#/errors/AuthError";

export function LoginPage() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigateTo = useNavigate();

  const onLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await emailSignIn(userEmail, userPassword);
      navigateTo("/");
    } catch (error) {
      if (error instanceof AuthError) {
        console.error(
          `Error number: ${error.number} \nMessage: ${error.message}`,
        );
      }
    }
  };

  async function onGoogleLogin() {
    await googleSignIn();
    navigateTo("/");
  }

  return (
    <div>
      <h1>User Login</h1>
      <form onSubmit={onLoginSubmit}>
        <input
          type="email"
          value={userEmail}
          onChange={(event) => setUserEmail(event.target.value)}
          placeholder="Enter Email"
        />
        <input
          type="password"
          value={userPassword}
          onChange={(event) => setUserPassword(event.target.value)}
          placeholder="Enter Password"
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={onGoogleLogin}>Sign in with Google</button>
    </div>
  );
}
