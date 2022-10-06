import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useResize } from "../../../hooks/useResize";
import Header from "../../Header/Header";
import "./Tasks.styles.css";
import Card from "../../Card/Card.jsx";
import TaskForm from "../../TaskForm/TaskForm";

const { REACT_APP_API_URL } = process.env;

export const Tasks = () => {
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPhone } = useResize();
  useEffect(() => {
    setLoading(true);
    fetch(`${REACT_APP_API_URL}task`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setList(data.result);
        setLoading(false);
      });
  }, []);
  const limitString = (str) => {
    if (str.length > 170) {
      return { string: str.slice(0, 167).concat("..."), addButton: true };
    } else {
      return { string: str, addButton: false };
    }
  };
  const renderAllCards = () => {
    return list?.map((data) => {
      return <Card key={data._id} data={data} />;
    });
  };
  const renderNewCards = () => {
    return list
      ?.filter((data) => data.status === "NEW")
      .map((data) => {
        return <Card key={data._id} data={data} />;
      });
  };
  const renderProgressCards = () => {
    return list
      ?.filter((data) => data.status === "IN PROGRESS")
      .map((data) => {
        return <Card key={data._id} data={data} />;
      });
  };
  const renderFinishedCards = () => {
    return list
      ?.filter((data) => data.status === "FINISHED")
      .map((data) => {
        return <Card key={data._id} data={data} />;
      });
  };
  return (
    <>
      <Header />

      <main id="tasks">
        <TaskForm />
        <section className="wrapper_list">
          <div className="list_header">
            <h2>Mis tareas</h2>
          </div>
          {isPhone ? (
            !list?.length ? (
              <h2>No hay Tareas Creadas</h2>
            ) : loading ? (
              <Skeleton height={900} />
            ) : (
              <div className="list phone">{renderAllCards()}</div>
            )
          ) : (
            <div className="list_group">
              {!list?.length ? (
                <h2>No hay Tareas Creadas</h2>
              ) : loading ? (
                <Skeleton height={900} />
              ) : (
                <>
                  <div className="list">
                    <h4>Nuevas</h4>
                    {renderNewCards()}
                  </div>
                  <div className="list">
                    <h4>En Proceso</h4>
                    {renderProgressCards()}
                  </div>
                  <div className="list">
                    <h4>Finalizadas</h4>
                    {renderFinishedCards()}
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
