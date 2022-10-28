import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { header } from "../../constants/token";
import axios from "axios";
import { REGISTER_NEW_USER } from "../../constants/urls";
import OkSVG from "../../assets/icons8-ok.svg";

export const SignUp = () => {
  const tokenAccess = localStorage.getItem("tokenCattleTracker");
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  // INPUT STATE:
  const [input, setInput] = useState({
    name: "",
    email: `${user?.email}`,
  });

  const redirectToHome = () => {
    Navigate("/home");
  };

  // HANDLE SUBMIT:
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(
        REGISTER_NEW_USER,
        input,
        header(tokenAccess)
      );
      if (response.status === 200) {
        return (
          <div className="submit-OK">
            <img src={OkSVG} alt="ok message" />
            <h2>
              Usuario creado exitosamente. Graciar por usar Cattle Tracker.
            </h2>
            <button onClick={redirectToHome}>Continuar al home</button>
          </div>
        );
      }
    } catch (error) {
      console.log(`Error en handleSubmit de SignUp. ${error.message}`);
    }
  };

  // HANDLE CHANGE:
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  //VALIDATIONS:
  //...validaciones con JS

  return (
    <>
      <h1>Bienvenido a Cattle Tracker</h1>
      <p>
        Es tu primera vez aquí, te pedimos que completes tu perfil para
        continuar<br></br>y accede a todas las funcionalidades de la app!
      </p>{" "}
      <br />
      <form onSubmit={handleSubmit} className="form-signup">
        <div className="form-input">
          <label htmlFor="name">Nombre: </label>
          <input
            type="text"
            name="name"
            value={input.name}
            placeholder="Nombre"
            minLength={1}
            maxLength={50}
            onChange={handleChange}
          />
        </div>
        <div className="form-input">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            value={input?.email}
            disabled={true}
            name="email"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
