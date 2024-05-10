import PropTypes from "prop-types";
import uuid from "react-uuid";

const Menu = ({ request, handlerDisplay, setDataToSee }) => {
  const select = (id) => {
    handlerDisplay();
    setDataToSee(id);
  };
  return (
    <div>
      {request.results.length > 0 &&
        request.results.map((el) => (
          <p key={uuid()} onClick={() => select(el.idVariable)}>
            {el.descripcion}
          </p>
        ))}
    </div>
  );
};

Menu.propTypes = {
  request: PropTypes.object,
  handlerDisplay: PropTypes.func,
  setDataToSee: PropTypes.func,
};

export default Menu;
