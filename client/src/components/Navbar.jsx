import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/Auth/auth.functions";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = () => {
    logoutUser(navigate, dispatch);
  };

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        {token && (
          <li>
            <NavLink to="/profile">Datos personales</NavLink>
          </li>
        )}
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
      </ul>
    </nav>
  );
};

export default Navbar;
