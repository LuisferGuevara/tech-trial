import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { token, user } = useSelector((state) => state.auth);

  return (
    <nav>
      <ul>
        {token && user.role === "admin" && (
          <li>
            <NavLink to="/usersList">Lista de Usuarios </NavLink>
          </li>
        )}
        {token && (
          <li>
            <NavLink to="/userProfile">Mi perfil </NavLink>
          </li>
        )}
        {token && (
          <li>
            <NavLink to="/logout">Cerrar Sesión</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
