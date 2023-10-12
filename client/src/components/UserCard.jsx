import { useState } from "react";
import EditProfileForm from "../components/EditProfileForm";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteUser } from "../redux/Auth/auth.functions";
import "../styles/UserCard.scss";

const UserCard = ({ user }) => {
  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();

  const handleEditClick = () => {
    setEdit(true);
  };

  const handleDeleteClick = () => {
    deleteUser(user._id, dispatch);
  };
  if (!user) {
    return null;
  }

  return (
    <>
      <div className="profile">
        <div className="profile--card">
          <div className="profile--content">
            <p>
              <strong>Nombre:</strong> <span>{user.name}</span>
            </p>
            <p>
              <strong>Apellido:</strong>
              <span> {user.lastName}</span>
            </p>
            <p>
              <strong>Correo Electrónico:</strong> <span>{user.email}</span>
            </p>
          </div>

          {edit ? (
            <EditProfileForm setEdit={setEdit} user={user} />
          ) : (
            <div className="profile--actions">
              <button onClick={handleEditClick}>Editar Perfil</button>
              <button onClick={handleDeleteClick}>Eliminar Usuario</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
UserCard.propTypes = { user: PropTypes.object };
export default UserCard;
