// IR AL PERFIL DE USUARIO
// IR A EL CARD CONTAINER Y MUESTRE TODOS LOS ANIMALES
// CREAR NEW ANIMAL

import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { cleanNewAnimal } from "../../redux/actions/actions";
import LogoutButton from "../Logout/LogoutButton";
import "./navBar.css";
export function NavBar() {
  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   console.log(`Limpiando new animal...`);
  //   dispatch(cleanNewAnimal());
  // }, []);

  return (
    <div className="nav-container">
      <span className="navbar-span">
        <Link to="/home">Home</Link>
      </span>
      <span className="navbar-span">
        <Link to="/home/newAnimal">Create new animal</Link>
      </span>
      <span className="navbar-span">
        <Link to="/home/management">Animal Management</Link>
      </span>
      <span className="navbar-span">
        <Link to="/home/profile">Profile</Link>
      </span>
      <LogoutButton />
    </div>
  );
}
