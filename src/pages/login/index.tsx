import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  userSignInWithEmail as emailSignIn,
  userSignInWithGoogle as googleSignIn,
} from "#/authentication/Authenticate";

import { useNotification } from "#/components/notification/NotificationContext";

import { AuthError } from "#/errors/AuthError";

export function LoginPage() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigateTo = useNavigate();
  const { addNotification } = useNotification();

  const onLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await emailSignIn(userEmail, userPassword);
      navigateTo("/");
    } catch (error) {
      if (error instanceof AuthError) {
        addNotification({
          title: `Login Error ${error.number}`,
          details: `${error.message}`,
          image: "https://i.imgur.com/9qbsgWc.png",
        });
      }
    }
  };

  async function onGoogleLogin() {
    await googleSignIn();

    addNotification({
      title: "Login Successful",
      details: "You have successfully logged in with Google",
      image:
        "https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA",
    });
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
