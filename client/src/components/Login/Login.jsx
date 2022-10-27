import React from "react";
import LoginButton from "./LoginButton";

export function Login() {
  const { user, isAuthenticated, getAccessTokenSilently, isLoading, logout } =
    useAuth0();

  const navigate = useNavigate();
  return (
    <>
      <LoginButton />
    </>
  );
}
