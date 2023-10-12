import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/Auth/auth.functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "../styles/Logout.scss";

const Logout = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(navigate, dispatch);
  };

  const { user, isLoading } = useSelector((state) => state.auth);
  if (!user && isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="dashboard">
      <div className="tool-container">
        <NavLink to="/userProfile">
          <FontAwesomeIcon icon={faUser} />
        </NavLink>
        <div className="tooltip"> Volver a Mi Perfil</div>
      </div>

      <h1>CERRAR SESIÓN</h1>

      <h3>
        <span style={{ color: "chocolate", textTransform: "uppercase", letterSpacing: "1.5px" }}>
          {user?.name}
        </span>
        , estás a punto de abandonar tu sesión. Pulsa el botón solo si estás seguro.
      </h3>

      {token && (
        <button className="logout-btn" onClick={handleLogout}>
          Cerrar sesión
        </button>
      )}
    </div>
  );
};

export default Logout;
