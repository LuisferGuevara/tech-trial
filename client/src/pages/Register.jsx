import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { postUser } from "../redux/Auth/auth.functions";
import "../styles/Register.scss";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isLoading } = useSelector((state) => state.auth);

  const registerUser = async (data) => {
    delete data.terms;
    postUser(data, navigate, dispatch);
  };

  return (

      <>
        {error && <h2 className="error">{error}</h2>}

        {isLoading && <h2 className="loading">Iniciando sesión</h2>}

        <form onSubmit={handleSubmit(registerUser)}>
          <NavLink className="link-back" to="/login">
            <i className="fa-solid fa-arrow-left"></i>
          </NavLink>
          <h3>Register</h3>
          <label className="label">
            Nombre
            <input
              type="text"
              placeholder="Nombre"
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
          <label className="label">
            Apellidos
            <input
              type="text"
              placeholder="Apellidos"
              className="input"
              {...register("lastName", {
                required: "Introduce un apellido",
                pattern: {
                  value: /^[\w\s\u00C0-\u017F]{4,16}$/i,
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
          <label className="label">
            Email
            <input
              type="email"
              placeholder="Correo Electrónico"
              className="input"
              {...register("email", {
                required: "Introduce un email",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Introduce un email válido",
                },
              })}
            />
          </label>
          {errors.email ? (
            <>
              {errors.email.type === "required" && <p className="error">{errors.email.message}</p>}
              {errors.email.type === "pattern" && <p className="error">{errors.email.message}</p>}
            </>
          ) : null}
          <label className="label">
            {" "}
            Contraseña
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="input"
              {...register("password", {
                required: "Debes de introducir una contraseña",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_=+-]).{8,20}$/,
                  message:
                    "Mínimo una minúscula, una mayúscula, un número y caracter especial. De 8 a 20 caracteres de largo.",
                },
              })}
            />
          </label>
          {errors.password ? (
            <>
              {errors.password.type === "required" && (
                <p className="error">{errors.password.message}</p>
              )}
              {errors.password.type === "pattern" && (
                <p className="error">{errors.password.message}</p>
              )}
            </>
          ) : null}

          <label className="terms">
            <input
              type="checkbox"
              className="input-checkbox"
              {...register("terms", {
                required: "Acepta los Terminos y Condiciones de Uso para continuar",
              })}
            />
            <span>
              <a
                className="terms--link"
                href="https://policies.google.com/terms?hl=es"
                target="_blank"
                rel="noreferrer"
              >
                Términos y Condiciones de Uso
              </a>
            </span>
          </label>
          {errors.terms ? (
            <>
              {errors.terms.type === "required" && <p className="error">{errors.terms.message}</p>}
            </>
          ) : null}
          <div>
            <button className="button">Registrarse</button>
          </div>
        </form>
      </>

  );
};

export default Register;
