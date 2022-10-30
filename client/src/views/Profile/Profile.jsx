import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavBar } from "../../components/NavBar/NavBar";
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
  }, [ dispatch, token]);

  function handleGoToLogin(e) {
    console.log(`handleGoToLogin disparada. Navegando a "/"...`);
    navigate("/");
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  console.log(user);
  console.log("userInfoState = ", userInfoState);
  console.log(user);
  return (
    <div>
      <NavBar />
      <div className="w-full mx-auto max-w-7xl px-8 mt-16 md:mt-5">
        {isAuthenticated && (
          <div className="font-sans text-gray">
            <h2 className="text-green text-2xl font-semibold">Mi perfil</h2>
            <div>
              <img
                src={
                  user?.picture
                    ? userInfoState.profile_img
                    : "https://thumbs.dreamstime.com/t/farmer-icon-badge-style-one-farm-collection-icon-can-be-used-ui-ux-farmer-icon-badge-style-one-farm-collection-124009969.jpg"
                }
                alt={user?.name}
              />
              <div className="flex items-center gap-3">
                <p className="text-gray font-semibold">Nombre</p>
                <h2>{userInfoState?.name}</h2>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-gray font-semibold">Email</p>
                <p>{userInfoState?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-gray font-semibold">User Id </p>
              <p>{userInfoState.id}</p>
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
      </div>
    </div>
  );
};
