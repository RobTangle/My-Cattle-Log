import React from "react";
import LoginButton from "./Login/LoginButton";

export function LandingPage() {
  return (
    <div>
      <h1>Bienvenido a Cattle Tracker App!</h1>
      <h3>Por favor, logueate para poder usar la aplicación</h3>
      <LoginButton />
    </div>
  );
}
