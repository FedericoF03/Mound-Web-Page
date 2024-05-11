import PropTypes from "prop-types";
import uuid from "react-uuid";
import "./Menu.css";

const Menu = ({ request, handlerDisplay, setDataToSee }) => {
  const select = (id) => {
    handlerDisplay();
    setDataToSee(id);
  };
  return (
    <section className="menu__Menu">
      {request.results.length > 0 &&
        request.results.map((el) => (
          <div className="principle-variables" key={uuid()}>
            <p onClick={() => select(el.idVariable)}>
              {el.descripcion.split("(")[0]}
            </p>
            <p>{el.fecha}</p>
            <p className="numbers">{`${
              el.descripcion.includes("$") ? "$" : ""
            }${el.valor}${el.descripcion.includes("%") ? "%" : ""}`}</p>
          </div>
        ))}
    </section>
  );
};

Menu.propTypes = {
  request: PropTypes.object,
  handlerDisplay: PropTypes.func,
  setDataToSee: PropTypes.func,
};

export default Menu;
