import React from "react";
import { useFormik } from "formik";
import "../Auth.styles.css";
import { Link } from "react-router-dom";
import * as Yup from "yup";

export const Register = () => {
  const initialValues = {
    userName: "",
    password: "",
    email: "",
    teamID: "",
    role: "",
    continent: "",
    region: "",
  };
  const required = "* Este campo es requerido";

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(4, "La cantidad minima de caracteres es 6")
      .required(required),
    password: Yup.string().required(required),
    email: Yup.string().email("Debe ser un email valido").required(required),
    teamID: Yup.string().required(required),
    role: Yup.string().required(required),
    continent: Yup.string().required(required),
    region: Yup.string().required(required),
  });
  const onSubmit = () => {
    alert();
  };
  const formik = useFormik({ initialValues, onSubmit, validationSchema });
  const { values, errors, handleChange, handleSubmit, touched, handleBlur } =
    formik;
  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h1>Registro</h1>
        <div>
          <label>Nombre del Usuario</label>
          <input
            type="text"
            name="userName"
            value={values.userName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.userName && touched.userName ? "error" : null}
          />
          {errors.userName && touched.userName && (
            <span className="error-message">{errors.userName}</span>
          )}
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password ? "error" : null}
          />
          {errors.password && touched.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>
        <div>
          <label>Email del Usuario</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email ? "error" : null}
          />
          {errors.email && touched.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>
        <input type="hidden" name="teamID" value="159159" />
        <div>
          <label>Rol</label>
          <select
            name="role"
            onChange={handleChange}
            value={values.role}
            onBlur={handleBlur}
            className={errors.role && touched.role ? "error" : null}
          >
            <option value="">Seleccionar</option>
            <option value="Team Member">Team Member</option>
            <option value="Team Leader">Team Leader</option>
          </select>
          {errors.role && touched.role && (
            <span className="error-message">{errors.role}</span>
          )}
        </div>
        <div>
          <label>Continente</label>
          <select
            name="continent"
            onChange={handleChange}
            value={values.continent}
            onBlur={handleBlur}
            className={errors.continent && touched.continent ? "error" : null}
          >
            <option value="">Seleccionar</option>
            <option value="America">America</option>
            <option value="Europa">Europa</option>
            <option value="Otro">Otro</option>
          </select>
          {errors.continent && touched.continent && (
            <span className="error-message">{errors.continent}</span>
          )}
        </div>
        <div>
          <label>Region</label>
          <select
            name="region"
            onChange={handleChange}
            value={values.region}
            onBlur={handleBlur}
            className={errors.region && touched.region ? "error" : null}
          >
            <option value="">Seleccionar</option>
            <option value="Latam">Latam</option>
            <option value="Brasil">Brasil</option>
            <option value="America del Norte">America del Norte</option>
            <option value="Otro">Otro</option>
          </select>
          {errors.region && touched.region && (
            <span className="error-message">{errors.region}</span>
          )}
        </div>
        <div>
          <button type="submit">Enviar</button>
        </div>
        <div>
          <Link to="/login">Iniciar Sesion</Link>
        </div>
      </form>
    </div>
  );
};
