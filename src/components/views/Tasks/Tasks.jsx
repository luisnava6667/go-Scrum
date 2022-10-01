import { useResize } from "../../../hooks/useResize";
import Header from "../../Header/Header";
import "./Tasks.styles.css";
import {cardsData} from './data.js'
import Card from '../../Card/Card.jsx'
import TaskForm from "../../TaskForm/TaskForm";

export const Tasks = () => {
  const {isPhone } = useResize();  
  const limitString = (str) => {
    if (str.length > 360) {
      return { string: str.slice(0, 357).concat("..."), addButton: true };
    } else {
      return { string: str, addButton: false };
    }
  };
  const renderAllCards = () => {
    return cardsData.map((card) => {
      <Card key={card.id} data={card}/>;
    })
  }
  return (
    <>
      <Header />
      
      <main id="tasks">
        <TaskForm/>
        <section className="wrapper_list">
          <div className="list_header">
            <h2>Mis tareas</h2>
          </div>
          {isPhone ? (
            <div className="list phone">
              {renderAllCards()}
            </div>
          ) : (
            <div className="list_group">
              <div className="list">
                <h4>Nuevas</h4>
                <div className="card">
                  <div className="close">X</div>
                  <h3>Tarea 1</h3>
                  <h6>24/09/2022 16:40 hs.</h6>
                  <h5>Luis Navarro</h5>
                  <button type="button">Nueva</button>
                  <button type="button">Alta</button>
                  <p>
                    {
                      limitString(
                        `Descripcion quia odio molestiae nulla dolorem corporis
                    aperiam. Sed! Nemo dolores expedita aliquid, blanditiis
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Amet ipsa odit dolore magnam aspernatur aut necessitatibus
                    accusantium quisquam rerum est deserunt delectus minus
                    cumque, in voluptate molestias consectetur inventore
                    laborum. Delectus ratione suscipit ducimus eligendi
                    perspiciatis minima voluptatibus, optio, provident ipsa
                    dolores enim explicabo! Libero sapiente doloremque
                    accusantium molestias voluptatem deserunt reiciendis saepe
                    error, architecto, repudiandae voluptates. Quis, explicabo
                    eveniet. Minima corporis id fugiat quidem qui veritatis
                    maiores. Recusandae eos aut tenetur aliquam rerum magni,
                    dolorum molestiae laboriosam ipsam explicabo eius reiciendis
                    nemo modi atque temporibus vitae exercitationem odit. Omnis.
                    Similique voluptate eligendi quo doloribus veniam labore
                    dolor hic eum sequi at? Odit sit dicta laborum nulla
                    explicabo iusto eum vitae quasi reprehenderit tenetur
                    incidunt quo ratione, sunt, ipsum ducimus? Temporibus
                    officia itaque ducimus laudantium facere, repudiandae, a
                    nisi accusamus excepturi vitae commodi corporis enim optio
                    minima veniam provident architecto quod cupiditate possimus.
                    Expedita aliquid modi quos mollitia architecto molestiae?
                    Obcaecati atque voluptatum quos vero corporis, minus nihil,
                    recusandae quidem quisquam molestiae possimus eligendi
                    exercitationem maiores voluptates fuga perferendis quo neque
                    illo placeat ipsam qui. Similique doloremque sapiente
                    aliquid cupiditate. Illo ipsum quasi ab cumque sapiente?
                    Aspernatur numquam saepe molestias repudiandae temporibus
                    perferendis perspiciatis ad at sed? Repudiandae temporibus
                    aut, officia impedit perspiciatis voluptas. Doloremque
                    perferendis debitis suscipit eum optio? Ad itaque eaque
                    nobis temporibus, officiis voluptate accusamus recusandae
                    quia quaerat unde officia consequatur ullam odit hic.
                    Facilis consequatur tenetur voluptas, quae quaerat, animi id
                    sed fugiat consectetur blanditiis explicabo. Asperiores
                    saepe nam modi sint quae accusantium fugit alias sit
                    eligendi? Cum assumenda velit ipsa fugit totam voluptates
                    laudantium fuga at dolor magnam, consectetur ullam
                    distinctio, minus, maxime id suscipit? Deserunt asperiores
                    id ad optio vero tempora perspiciatis officia autem nostrum,
                    nihil magni consequuntur, necessitatibus laborum hic,
                    voluptates est temporibus! Impedit incidunt atque ipsam,
                    expedita id at minima nesciunt aut?
                    `
                      ).string
                    }
                  </p>
                </div>
              </div>
              <div className="list">
                <h4>En Proceso</h4>
                <div className="card">
                  <div className="close">X</div>
                  <h3>Tarea 1</h3>
                  <h6>24/09/2022 16:40 hs.</h6>
                  <h5>Luis Navarro</h5>
                  <button type="button">Nueva</button>
                  <button type="button">Alta</button>
                  <p>
                    Descripcion quia odio molestiae nulla dolorem corporis
                    aperiam. Sed! Nemo dolores expedita aliquid, blanditiis
                  </p>
                </div>
              </div>
              <div className="list">
                <h4>Finalizadas</h4>
                <div className="card">
                  <div className="close">X</div>
                  <h3>Tarea 1</h3>
                  <h6>24/09/2022 16:40 hs.</h6>
                  <h5>Luis Navarro</h5>
                  <button type="button">Nueva</button>
                  <button type="button">Alta</button>
                  <p>
                    Descripcion quia odio molestiae nulla dolorem corporis
                    aperiam. Sed! Nemo dolores expedita aliquid, blanditiis
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
};
