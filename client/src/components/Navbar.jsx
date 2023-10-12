import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faTableList, faUser } from "@fortawesome/free-solid-svg-icons";
import "../styles/Navbar.scss";

const Navbar = () => {
  const { token, user } = useSelector((state) => state.auth);
  const location = useLocation();

  return (
    <nav>
      <ul>
        {token && user.role === "admin" && (
          <li>
            <div className="tooltip-container">
              <NavLink to="/usersList">
                <FontAwesomeIcon
                  icon={faTableList}
                  className={location.pathname === "/usersList" ? "fa-icon active" : "fa-icon"}
                />
              </NavLink>
              <div className="tooltip"> Lista de Usuarios</div>
            </div>
          </li>
        )}
        {token && (
          <li>
            <div className="tooltip-container">
              <NavLink
                to="/userProfile"
                className={location.pathname === "/userProfile" ? "fa-icon active" : "fa-icon"}
              >
                <FontAwesomeIcon icon={faUser} className="fa-icon" />
              </NavLink>
              <div className="tooltip"> Mi Perfil</div>
            </div>
          </li>
        )}
        {token && (
          <li>
            <div className="tooltip-container">
              <NavLink to="/logout">
                <FontAwesomeIcon icon={faRightFromBracket} className="fa-icon" />
              </NavLink>
              <div className="tooltip"> Cerrar Sesión</div>
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
