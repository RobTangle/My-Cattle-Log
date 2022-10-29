import React from "react";
import LoginButton from "../../components/Login/LoginButton";

export function LandingPage() {
  return (
    <div className="flex flex-col py-12 px-5 items-center bg-landing bg-cover bg-center	 ">
      <div className="bg-white/90 p-5">
        <h1 className="text-3xl text-center text-green font-semibold">
          Bienvenido a Cattle Log
        </h1>
        <img
          src="https://res.cloudinary.com/dfbxjt69z/image/upload/v1667055963/cattle/ve-removebg-preview_kp8zjn.png"
          alt="logo"
        />
        <h3 className="text-gray">
          Cattle Log es una nueva plataforma para la ganadería del futuro, que
          permite digitalizar el campo, donde podrás registrar tus animales, sus
          movimientos, y mucho más.
        </h3>
        <LoginButton />
      </div>
    </div>
  );
}
