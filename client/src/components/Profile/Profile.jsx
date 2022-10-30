import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavBar } from "../NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../redux/actions/actions";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfoState = useSelector((state) => state.userInfo);

  const token = localStorage.getItem("tokenCattleTracker");

  React.useEffect(() => {
    dispatch(getUserInfo(token));
  }, []);

  function handleGoToLogin(e) {
    console.log(`handleGoToLogin disparada. Navegando a "/"...`);
    navigate("/");
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  console.log(user);
  console.log("userInfoState = ", userInfoState);
  return (
    <>
      <NavBar />
      {isAuthenticated && (
        <div>
          <div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
          <div>
            <h2>User profile </h2>
            <div>
              <img src={userInfoState.profile_img} alt="User's profile image" />
            </div>
            <h4>{userInfoState.name}</h4>
            <h5>Email: {userInfoState.email}</h5>
            <h5>User Id: {userInfoState.id}</h5>
          </div>
        </div>
      )}
      {!isAuthenticated ? (
        <div>
          <div>Debes loguearte para ver tu perfíl.</div>
          <div>
            <button onClick={handleGoToLogin}>Loguearme</button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Profile;
