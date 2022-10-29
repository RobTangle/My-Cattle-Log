import React from "react";
import LoginButton from '../../components/Login/LoginButton'

export function LandingPage() {
  return (
    <div>
      <h1>Bienvenido a My Cattle Log!</h1>
      <h3>
        Cattle Log es una nueva plataforma para la ganadería del futuro, que permite digitalizar el campo, donde podrás registrar tus animales, sus movimientos, y mucho más.
      </h3>
      <LoginButton />
    </div>
  );
}
