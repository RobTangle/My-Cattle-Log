import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavBar } from "../NavBar/NavBar";

export const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  console.log(user);

  return (
    <>
      <NavBar />
      {isAuthenticated && (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      )}
      {!isAuthenticated ? <div>Debes loguearte para ver tu perfíl.</div> : null}
    </>
  );
};

export default Profile;
