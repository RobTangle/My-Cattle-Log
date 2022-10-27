// IR AL PERFIL DE USUARIO
// IR A EL CARD CONTAINER Y MUESTRE TODOS LOS ANIMALES
// CREAR NEW ANIMAL

import React from "react";
import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <div className="nav-container">
      <Link to="/home">Home</Link>
      <Link to="/home/newAnimal">Create new animal</Link>
      <Link to="/home/list">List of animals</Link>
    </div>
  );
}
