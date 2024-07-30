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
    </div>
  );
}

export default LandingPage;
