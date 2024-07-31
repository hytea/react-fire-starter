import { useNavigate } from "react-router-dom";

import { getUser } from "#/authentication/Authenticate";

export function LandingPage() {
  const user = getUser();
  const navigateTo = useNavigate();

  if (!user) {
    navigateTo("/login");
    return null;
  }

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <p>This is the landing page for authenticated users</p>
      <button onClick={() => navigateTo("/logout")}>Logout</button>
    </div>
  );
}

export default LandingPage;
