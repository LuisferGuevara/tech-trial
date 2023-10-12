import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ component }) => {
  const user = localStorage.getItem("user");
  if (!user) return <Navigate to="/login" />;

  return component;
};
AuthRoute.propTypes = { component: PropTypes.element };

export default AuthRoute;
