import { useNavigate } from "react-router-dom";

import { getUser } from "#/authentication/Authenticate";

import "./LandingPage.css";

export function LandingPage() {
  const user = getUser();
  const navigateTo = useNavigate();

  if (!user) {
    navigateTo("/login");
    return null;
  }

  return (
    <div className="landing-container">
      <div className="landing-header">
        <h1>Welcome, {user.displayName || user.email}</h1>
        <p>This is the landing page for authenticated users.</p>
      </div>
      <div className="user-info">
        <img
          src={user.photoURL || "/default-avatar.png"}
          alt="User Avatar"
          className="user-avatar"
        />
        <div className="user-details">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>UID:</strong> {user.uid}
          </p>
          <p>
            <strong>Phone Number:</strong> {user.phoneNumber || "N/A"}
          </p>
        </div>
      </div>
      <button className="logout-button" onClick={() => navigateTo("/logout")}>
        Logout
      </button>
    </div>
  );
}
