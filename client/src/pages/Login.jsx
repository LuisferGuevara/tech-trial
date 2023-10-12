import "../styles/Login.scss";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/Auth/auth.functions";

const Login = () => {
  const { error, isLoading } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/UserProfile");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const login = (formdata) => {
    loginUser(formdata, navigate, dispatch);
  };

  return (
    <>
      {error && <h2 className="error">{error}</h2>}
      {isLoading && <h2>Iniciando sesión</h2>}
      <form onSubmit={handleSubmit(login)}>
        <h3>Login</h3>
        <label>
          {" "}
          Email
          <input
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            className="input"
            {...register("email", {
              required: "Debes de introducir un email",
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

        <label>
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
        <p className="go-to-register">
          ¿Eres nuevo? <NavLink to="/register">Crear cuenta</NavLink>
        </p>
        <button className="button">INICIAR SESIÓN</button>
      </form>{" "}
    </>
  );
};

export default Login;
