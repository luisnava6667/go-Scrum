import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useResize } from "../../../hooks/useResize";
import Header from "../../Header/Header";
import "./Tasks.styles.css";
import Card from "../../Card/Card.jsx";
import TaskForm from "../../TaskForm/TaskForm";
import { useSelector, useDispatch} from "react-redux";
import debounce from "lodash.debounce";
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { getTasks, deleteTask, editTaskStatus  } from "../../../store/actions/taskActions";
// const { REACT_APP_API_URL } = process.env;

export const Tasks = () => {
  const [list, setList] = useState(null);
  const [renderList, setRenderList] = useState(null);
  const [tasksfromWho, setTasksfromWho] = useState("All");
  const [search, setSearch] = useState("");
  const { isPhone } = useResize();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasks(tasksfromWho === "ME" ? "me" : ""));
  }, [tasksfromWho, dispatch]);
  const { tasks, error, loading } = useSelector((state) => {
    return state.tasksReducer;
  });
 
  useEffect(() => {
    if (tasks?.length) {
      setList(tasks);
      setRenderList(tasks);
    }
  }, [tasks]);

  useEffect(() => {
    if (search) {
      setRenderList(list.filter((data) => data.title.startsWith(search)));
    } else {
      setRenderList(list);
    }
  }, [search]);
 

  const renderAllCards = () => {
    return renderList?.map((data) => {
      return <Card key={data._id} data={data} deleteCard={handleDelete} editCardStatus={handleEditStatus}/>;
    });
  };
  const renderColumnCards = (text) => {
    return renderList
      ?.filter((data) => data.status === text)
      .map((data) => {
        return <Card key={data._id} data={data} deleteCard={handleDelete} editCardStatus={handleEditStatus}/>;
      });
  };

  const handleChangeImportance = (e) => {
    if (e.currentTarget.value === "ALL") {
      setRenderList(list);
    } else {
      setRenderList(
        list.filter((data) => data.importance === e.currentTarget.value)
      );
    }
  };
  const handleSearch = debounce((event) => {
    setSearch(event?.target?.value);
  }, 1000);
  const handleDelete = (id) => dispatch(deleteTask(id))
  const handleEditStatus = (data) => dispatch(editTaskStatus(data))
  if(error){
    return <h1>Something went wrong</h1>
  }
  return (
    <>
      <Header />

      <main id="tasks">
        <TaskForm />
        <section className="wrapper_list">
          <div className="list_header">
            <h2>Mis tareas</h2>
          </div>
          <div className="filters">
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                onChange={(event) => setTasksfromWho(event.currentTarget.value)}
              >
                <FormControlLabel
                  value="ALL"
                  control={<Radio />}
                  label="Todas"
                />
                <FormControlLabel
                  value="ME"
                  control={<Radio />}
                  label="Mis tareas"
                />
              </RadioGroup>
            </FormControl>
            <div className="search">
              <input
                type="text"
                placeholder="Buscar por título..."
                onChange={handleSearch}
              />
            </div>
            <select name="importance" onChange={handleChangeImportance}>
              <option value="">Seleccionar una prioridad</option>
              <option value="ALL">Todas</option>
              <option value="LOW">Baja</option>
              <option value="MEDIUM">Media</option>
              <option value="HIGH">Alta</option>
            </select>
          </div>
          {isPhone ? (
            !renderList?.length ? (
              <h2>No hay Tareas Creadas</h2>
            ) : loading ? (
              <Skeleton height={900} />
            ) : (
              <div className="list phone">{renderAllCards()}</div>
            )
          ) : (
            <div className="list_group">
              {!renderList?.length ? (
                <h2>No hay Tareas Creadas</h2>
              ) : loading ? (
                <Skeleton height={900} />
              ) : (
                <>
                  <div className="list">
                    <h4>Nuevas</h4>
                    {renderColumnCards("NEW")}
                  </div>
                  <div className="list">
                    <h4>En Proceso</h4>
                    {renderColumnCards("IN PROGRESS")}
                  </div>
                  <div className="list">
                    <h4>Finalizadas</h4>
                    {renderColumnCards("FINISHED")}
                  </div>
                </>
              )}
            </div>
          )}
        </section>
      </main>
    </>
  );
};
