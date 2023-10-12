import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { putUser, putUsers } from "../redux/Auth/auth.functions";
import "../styles/EditProfile.scss";

const EditProfileForm = ({ setEdit, user }) => {
  const { user: loggedUser } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    setValue("name", user?.name || "");
    setValue("lastName", user?.lastName || "");
  }, [user, setValue]);

  const editUser = async (data) => {
    if (user._id === loggedUser._id) {
      await putUser(data, dispatch, user._id, setEdit);
    } else {
      await putUsers(data, dispatch, user._id, setEdit);
    }
  };

  const handleCancelClick = () => {
    setEdit(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(editUser)} className="edit-profile-container">
        <h3>Actualizar Datos</h3>
        <label>
          Nombre:
          <input
            type="text"
            defaultValue={user?.name}
            className="input"
            {...register("name", {
              required: "Introduce un nombre",
              pattern: {
                value: /^[\w\s\u00C0-\u017F]{4,16}$/i,
                message: "El nombre debe tener entre 4 y 16 caracteres",
              },
            })}
          />
        </label>
        {errors.name ? (
          <>
            {errors.name.type === "required" && <p className="error">{errors.name.message}</p>}
            {errors.name.type === "pattern" && <p className="error">{errors.name.message}</p>}
          </>
        ) : null}
        <label>
          {" "}
          Apellidos:
          <input
            type="text"
            defaultValue={user?.lastName}
            className="input"
            {...register("lastName", {
              required: "Introduce un apellido",
              pattern: {
                value: /^[\w\s\u00C0-\u017F]{2,40}$/i,
                message: "Los apellidos deben tener entre 2 y 40 caracteres",
              },
            })}
          />
        </label>
        {errors.lastName ? (
          <>
            {errors.lastName.type === "required" && (
              <p className="error">{errors.lastName.message}</p>
            )}
            {errors.lastName.type === "pattern" && (
              <p className="error">{errors.lastName.message}</p>
            )}
          </>
        ) : null}

        <div>
          <button className="button">Actualizar</button>
          <button type="button" onClick={handleCancelClick} className="button cancel">
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
};

EditProfileForm.propTypes = {
  user: PropTypes.object,
  setEdit: PropTypes.func,
};

export default EditProfileForm;
