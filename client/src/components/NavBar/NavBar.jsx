// IR AL PERFIL DE USUARIO
// IR A EL CARD CONTAINER Y MUESTRE TODOS LOS ANIMALES
// CREAR NEW ANIMAL

import React, { useState } from "react";
import { useDispatch } from "react-redux";
//eslint-disable-next-line
import { cleanNewAnimal } from "../../redux/actions/actions";
import LogoutButton from "../Logout/LogoutButton";
import { BiMenu } from "react-icons/bi";
import { VscClose } from "react-icons/vsc";
import NavbarLink from "./NavbarLink";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Login/LoginButton";

export function NavBar() {
  //eslint-disable-next-line
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const { isLoading, isAuthenticated } = useAuth0();

  // React.useEffect(() => {
  //   console.log(`Limpiando new animal...`);
  //   dispatch(cleanNewAnimal());
  // }, []);
  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className="w-full h-full bg-white text-green font-semibold flex justify-around items-center mx-w-7xl mx-auto md:shadow-3xl ">
      <div className="md:hidden">
        {openMenu ? (
          <button
            className="text-2xl absolute right-5 top-5 z-50"
            onClick={handleMenu}
          >
            <VscClose />
          </button>
        ) : (
          <>
            <button
              className="text-2xl absolute right-5 top-5 z-50"
              onClick={handleMenu}
            >
              <BiMenu />
            </button>
          </>
        )}
      </div>
      {openMenu ? (
        <div className="flex flex-col w-full h-screen z-30 pt-8 px-5 gap-3 absolute top-0 bg-white text-gray">
          <NavbarLink path="/home" text="Inicio" />
          <NavbarLink path="/home/management" text="Administrar animales" />
          {!isLoading && isAuthenticated ? (
            <>
              <NavbarLink path="/home/profile" text="Perfil" />
              <div>
                <LogoutButton />
              </div>
            </>
          ) : (
            <>
              <LoginButton />
            </>
          )}
        </div>
      ) : null}
      <div className="hidden  md:flex md:w-full md:h-20 md:justify-around md:py-5 md:px-5 md:gap-8 md:bg-white md:text-gray">
        <NavbarLink
          path="/home"
          text="Inicio"
          divStyle=" w-fit border-solid border-b-2 border-transparent hover:border-green ease-in-out  hover:text-green  hover:cursor-pointer transition-all duration-300 "
        />

        <NavbarLink
          path="/home/management"
          divStyle=" w-fit border-solid border-b-2 border-transparent hover:border-green ease-in-out  hover:text-green  hover:cursor-pointer transition-all duration-300 "
          text="Administrar animales"
        />
        <NavbarLink
          path="/home/profile"
          divStyle=" w-fit border-solid border-b-2 border-transparent hover:border-green ease-in-out  hover:text-green  hover:cursor-pointer transition-all duration-300 "
          text="Perfil"
        />
        <div>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
