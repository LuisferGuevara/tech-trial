import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ component }) => {
  const { user } = useSelector((state) => state.auth);
  if (user === null) return <Navigate to="/login" />;
  if (user) return component;
};
AuthRoute.propTypes = { component: PropTypes.object };

export default AuthRoute;
