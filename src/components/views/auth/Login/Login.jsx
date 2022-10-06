import React from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { swal } from "../../../../utils/swal";
import "../Auth.styles.css";
const { REACT_APP_API_URL } = process.env;

const Login = () => {
  const navigate = useNavigate();
  const initialValues = {
    userName: "",
    password: "",
  };
  const validationSchema = () =>
    Yup.object().shape({
      userName: Yup.string()
        .min(4, "La cantidad mínima de caracteres es 4")
        .required("El nombre de usuario es requerido"),
      password: Yup.string().required("La contraseña es requerida"),
    });

  const onSubmit = () => {
    fetch(`${REACT_APP_API_URL}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: values.userName,
        password: values.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status_code === 200) {
          localStorage.setItem("token", data?.result?.token);
          localStorage.setItem("userName", data?.result?.user.userName);
          navigate("/", { replace: true });
        } else {
         swal();
        }
      });
  };
  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const { handleSubmit, handleChange, errors, handleBlur, touched, values } =
    formik;
  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h1>Iniciar Sesión</h1>
        <div>
          <label>Nombre de Usuario</label>
          <input
            type="text"
            name="userName"
            value={values.userName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.userName && touched.userName ? "error" : ""}
          />
          {errors.userName && touched.userName && <div>{errors.userName}</div>}
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            autoComplete="on"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password ? "error" : ""}
          />
          {errors.password && touched.password && <div>{errors.password}</div>}
        </div>
        <div>
          <button type="submit">Enviar</button>
        </div>
        <div>
          <Link to="/register">Registrarse</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
