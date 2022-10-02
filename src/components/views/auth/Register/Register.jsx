import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import "../Auth.styles.css";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { Switch, FormControlLabel } from "@mui/material";

export const Register = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    fetch("//localhost:4000/auth")
      .then((response) => response.json())
      .then((data) => setData(data.result));
  }, []);
  // console.log({data});

  const initialValues = {
    userName: "",
    password: "",
    email: "",
    teamID: "",
    role: "",
    continent: "",
    region: "",
    switch: false,
  };
  const required = "* Este campo es requerido";

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(4, "La cantidad minima de caracteres es 6")
      .required(required),
    password: Yup.string().required(required),
    email: Yup.string().email("Debe ser un email valido").required(required),
    // teamID: Yup.string().required(required),
    role: Yup.string().required(required),
    continent: Yup.string().required(required),
    region: Yup.string().required(required),
  });
  const handleChangeContinent = (value) => {
    setFieldValue("continent", value);
    if (value !== "America") {
      setFieldValue("region", "");
    }
  };
  const onSubmit = () => {
    const teamID = !values.teamID ? uuidv4() : values.teamID;
    fetch("//localhost:4004/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          userName: values.userName,
          password: values.password,
          email: values.email,
          teamID,
          role: values.role,
          continent: values.continent,
          region: values.region,
        },
      })
        .then((response) => response.json())
        .then((data) =>
          navigate("/registered/" + data?.result?.user?.teamID, {
            replace: true,
          })
        ),
    });
  };
  const formik = useFormik({ initialValues, onSubmit, validationSchema });
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    touched,
    handleBlur,
    setFieldValue,
  } = formik;
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
        <FormControlLabel
          control={
            <Switch
              value={values.switch}
              onChange={() =>
                formik.setFieldValue("switch", !formik.values.switch)
              }
              name="switch"
              color="secondary"
            />
          }
          label="¿Perteneces a un equipo?"
        />
        {values.switch && (
          <div>
            <label>Team ID</label>
            <input
              type="text"
              name="teamID"
              value={values.teamID}
              onChange={handleChange}
            />
          </div>
        )}
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
            {data?.Rol.map((op) => (
              <option value={op} key={op}>
                {op}
              </option>
            ))}
          </select>
          {errors.role && touched.role && (
            <span className="error-message">{errors.role}</span>
          )}
        </div>
        <div>
          <label>Continente</label>
          <select
            name="continent"
            onChange={(e) => handleChangeContinent(e.currentTarget.value)}
            value={values.continent}
            onBlur={handleBlur}
            className={errors.continent && touched.continent ? "error" : null}
          >
            <option value="">Seleccionar</option>
            {data?.continente.map((op) => (
              <option value={op} key={op}>
                {op}
              </option>
            ))}
          </select>
          {errors.continent && touched.continent && (
            <span className="error-message">{errors.continent}</span>
          )}
        </div>
        {values.continent === "America" && (
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
              {data?.region.map((op) => (
                <option value={op} key={op}>
                  {op}
                </option>
              ))}
            </select>
            {errors.region && touched.region && (
              <span className="error-message">{errors.region}</span>
            )}
          </div>
        )}
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
