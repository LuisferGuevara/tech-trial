import { useState } from "react";
import EditProfileForm from "../components/EditProfileForm";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteUser } from "../redux/Auth/auth.functions";

const UserCard = ({ user }) => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  const handleEditClick = () => {
    setEdit(true);
  };

  const handleDeleteClick = () => {
    deleteUser(user._id, dispatch);
  };

  return (
    <div className="profile">
      <div className="profile--info">
        <p>
          <strong>Nombre:</strong> {user.name}
        </p>
        <p>
          <strong>Apellido:</strong> {user.lastName}
        </p>
        <p>
          <strong>Correo Electrónico:</strong> {user.email}
        </p>
        {/* Agrega aquí más información de perfil si es necesario */}
      </div>

      {edit ? (
        <EditProfileForm setEdit={setEdit} />
      ) : (
        <div className="profile--actions">
          <button onClick={handleEditClick}>Editar Perfil</button>
          <button onClick={handleDeleteClick}>Eliminar Usuario</button>
        </div>
      )}
    </div>
  );
};
UserCard.propTypes = { user: PropTypes.object };
export default UserCard;
