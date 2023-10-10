
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/Auth/auth.functions";
// import { NavLink } from "react-router-dom";
// import "../styles/Home.scss";

const Logout = () => {
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate()
  
    const handleLogout = () => {
      logoutUser(navigate, dispatch);
    };
  
  const { user, isLoading } = useSelector((state) => state.auth);
  if (!user && isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="home--section">
      <h1>CERRAR SESSION</h1>
      {token && (
          <li className="logout" onClick={handleLogout}>
            <p>Cerrar sesión</p>
            <div className="icon--box">
              <img
                className="logot--logo"
                // src="https://res.cloudinary.com/dfxn0bmo9/image/upload/v1670171708/icons/logoutIcon-01_ywpjwq.svg"
                alt="Cerrar sesión logo"
              />
            </div>
          </li>
        )}
     
    </div>
  );
};

export default Logout;
