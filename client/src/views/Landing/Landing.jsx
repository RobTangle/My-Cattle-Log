import React from "react";
import LoginButton from "../../components/Login/LoginButton";

export function LandingPage() {
  return (
    <div className=" w-full h-full p-5 min-h-screen flex items-center bg-landing bg-cover bg-center">
      <div className="bg-white/80 p-5 rounded-sm mx-auto max-w-2xl md:p-8">
        <h1 className="text-3xl text-center text-gray font-semibold">
          Bienvenido a Cattle Log
        </h1>
        <div className="w-1/2 h-[200px] sm:w-[300px] mx-auto">
          <img
            className="w-full h-full object-cover object-center"
            src="https://res.cloudinary.com/dfbxjt69z/image/upload/v1667055963/cattle/ve-removebg-preview_kp8zjn.png"
            alt="logo"
          />
        </div>
        <h3 className="text-gray text-jus">
          Cattle Log es una nueva plataforma para la ganadería del futuro, que
          permite digitalizar el campo, donde podrás registrar tus animales, sus
          movimientos, y mucho más.
        </h3>
        <LoginButton />
      </div>
    </div>
  );
}
