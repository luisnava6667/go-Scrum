import React from "react";
import "./TaskForm.styles.css";
import { useFormik } from "formik";
import * as Yup from "yup";
const TaskForm = () => {
  const initialValues = {
    title: "",
    status: "",
    priority: "",
    description: "",
  };

  const onSubmit = () => {
    alert();
  };
  const required = "* Este campo es requerido";
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(6, "La cantidad minima de caracteres es 6")
      .required(required),
    status: Yup.string().required(required),
    priority: Yup.string().required(required),
  });
  const formik = useFormik({ initialValues, onSubmit, validationSchema });
  const { handleChange, handleSubmit, errors, touched, handleBlur } = formik;
  return (
    <section className="task-form">
      <h2>Crear Tarea</h2>
      <p>Crea tus Tareas</p>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              placeholder="Titiulo"
              onBlur={handleBlur}
              className={errors.title && touched.title ? "error" : null}
            />
            {errors.title && touched.title && (
              <span className="error-message">{errors.title}</span>
            )}
          </div>
          <div>
            <select
              name="status"
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.status && touched.status ? "error" : null}
            >
              <option value="">Seleccionar una prioridad</option>
              <option value="new">Nueva</option>
              <option value="inProcess">En Proceso</option>
              <option value="finished">Finalizada</option>
            </select>
            {errors.status && touched.status && (
              <span className="error-message">{errors.status}</span>
            )}
          </div>
          <div>
            <select
              name="priority"
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.priority && touched.priority ? "error" : null}
            >
              <option value="">Seleccionar un estado</option>
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
            {errors.priority && touched.priority && (
              <span className="error-message">{errors.priority}</span>
            )}
          </div>
        </div>
        <div>
          <textarea
            name="description"
            onChange={handleChange}
            placeholder="Descripcion..."
          ></textarea>
        </div>
        <button type="submit">Crear</button>
      </form>
    </section>
  );
};

export default TaskForm;
