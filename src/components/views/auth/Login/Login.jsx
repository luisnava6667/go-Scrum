import React from "react";
import {useFormik} from 'formik';
import {Link, useNavigate} from 'react-router-dom';
import '../Auth.styles.css';
const Login = () => {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  }
  const validate = values =>{
    const errors = {};
    if(!values.email){
      errors.email = "El email es obligatorio";
    }
    if(!values.password){
      errors.password = "La contraseña es requerida";
    }
    return errors;
  }
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const onSubmit = () => {
   localStorage.setItem("logged", 'yes');
   navigate('/', { replace: true });
  };
  const formik = useFormik({ initialValues, validate, onSubmit });
  const { values, errors, handleChange, handleSubmit } = formik;
  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h1>Iniciar Sesión</h1>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email ? <div>{errors.email}</div> : null}
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password ? <div>{errors.password}</div> : null}
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
