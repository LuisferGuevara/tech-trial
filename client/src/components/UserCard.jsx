
import  { useState } from "react";
import EditProfileForm from "../components/EditProfileForm";
import PropTypes from 'prop-types';


const UserCard = ({user}) => {

  console.log("soy user:",user)
  const [edit, setEdit] = useState(false);

  const handleEditClick = () => {
    setEdit(true);
  };

  return (
    <div className="profile">
      <div className="profile--info">
        <p><strong>Nombre:</strong> {user.name}</p>
        <p><strong>Apellido:</strong> {user.lastName}</p>
        <p><strong>Correo Electrónico:</strong> {user.email}</p>
        {/* Agrega aquí más información de perfil si es necesario */}
      </div>

      {edit ? (
        <EditProfileForm setEdit={setEdit} />
      ) : (
        <button onClick={handleEditClick}>Editar Perfil</button>
      )}
    </div>
  );
};
UserCard.propTypes = {user: PropTypes.object}
export default UserCard;
