// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { putUser } from "../redux/Auth/auth.functions";
import "../styles/EditProfile.scss";

// eslint-disable-next-line react/prop-types
const EditProfileForm = ({ setEdit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const dispatch = useDispatch();

  const { error, isLoading, user } = useSelector((state) => state.auth);

  useEffect(() => {
    setValue("name", user?.name);
    setValue("lastName", user?.lastName);
    setValue("region", user?.region);
  }, [user, setValue]);

  const editUser = async (data) => {
    putUser(data, dispatch, user._id, setEdit);
  };

  return (
    <>
      {error && <h2 className="error">{error}</h2>}

      {isLoading && <h2 className="loading">Iniciando sesión</h2>}

      <form onSubmit={handleSubmit(editUser)} className="edit-profile-container">
        <h3>Actualiza tus datos</h3>
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
        </div>
      </form>
    </>
  );
};

export default EditProfileForm;
