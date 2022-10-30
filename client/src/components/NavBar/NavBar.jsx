// IR AL PERFIL DE USUARIO
// IR A EL CARD CONTAINER Y MUESTRE TODOS LOS ANIMALES
// CREAR NEW ANIMAL

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
//eslint-disable-next-line
import { cleanNewAnimal } from "../../redux/actions/actions";
import LogoutButton from "../Logout/LogoutButton";
import { BiMenu } from "react-icons/bi";
import { VscClose } from "react-icons/vsc";

export function NavBar() {
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);

  // React.useEffect(() => {
  //   console.log(`Limpiando new animal...`);
  //   dispatch(cleanNewAnimal());
  // }, []);
  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className="w-full h-full bg-white text-green font-semibold flex justify-around items-center mx-w-7xl mx-auto">
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
          <div className="navbar-div">
            <Link to="/home">Home</Link>
          </div>
          <div className="navbar-div">
            <Link to="/home/newAnimal">Create new animal</Link>
          </div>
          <div className="navbar-div">
            <Link to="/home/management">Animal Management</Link>
          </div>
          <div className="navbar-div">
            <Link to="/home/profile">Profile</Link>
          </div>
          <div>
            <LogoutButton />
          </div>
        </div>
      ) : null}
      <div className="hidden  md:flex md:w-full md:h-20 md:justify-around md:py-5 md:px-5 md:gap-8 md:bg-white md:text-gray">
        <div className="navbar-div">
          <Link to="/home">Home</Link>
        </div>
        <div className="navbar-div">
          <Link to="/home/newAnimal">Create new animal</Link>
        </div>
        <div className="navbar-div">
          <Link to="/home/management">Animal Management</Link>
        </div>
        <div className="navbar-div">
          <Link to="/home/profile">Profile</Link>
        </div>
        <div>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
