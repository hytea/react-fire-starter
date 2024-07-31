import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { userSignUpWithEmail as emailSignUp } from "#/authentication/Authenticate";

import { useNotification } from "#/components/notification/NotificationContext";

import { AuthError } from "#/errors/AuthError";

import "./SignUpPage.css";

export function SignUpPage() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigateTo = useNavigate();
  const { addNotification } = useNotification();

  const onSignUpSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (userPassword !== confirmPassword) {
      addNotification({
        title: "Sign Up Error",
        details: "Passwords do not match",
        image: "https://i.imgur.com/9qbsgWc.png",
      });
      return;
    }

    try {
      await emailSignUp(userEmail, userPassword);
      navigateTo("/");
    } catch (error) {
      if (error instanceof AuthError) {
        addNotification({
          title: `Sign Up Error ${error.number}`,
          details: `${error.message}`,
          image: "https://i.imgur.com/9qbsgWc.png",
        });
      }
    }
  };

  return (
    <div className="sign-up-container">
      <img
        className="login-logo"
        src="/ReactFireStarterLogo.svg"
        alt="logo"
        width={200}
        height={200}
      />
      <h1 className="sign-up-title">Account Creation</h1>
      <form className="sign-up-form" onSubmit={onSignUpSubmit}>
        <input
          className="sign-up-input"
          type="email"
          value={userEmail}
          onChange={(event) => setUserEmail(event.target.value)}
          placeholder="Enter Email"
        />
        <input
          className="sign-up-input"
          type="password"
          value={userPassword}
          onChange={(event) => setUserPassword(event.target.value)}
          placeholder="Enter Password"
        />
        <input
          className="sign-up-input"
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          placeholder="Confirm Password"
        />
        <button className="sign-up-button" type="submit">
          Create an account
        </button>
      </form>
    </div>
  );
}
