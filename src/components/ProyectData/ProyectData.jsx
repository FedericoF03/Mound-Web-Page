import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";

import useFetch from "../../Hooks/useFetch";

import "./ProyectData.css";

const configCssGraphic = {
  backgroundColor: "white",
  lineColor: "#2962FF",
  textColor: "black",
  areaTopColor: "#2962FF",
  areaBottomColor: "rgba(41, 98, 255, 0.28)",
};

const ProyectData = ({ dataToSee, request: requestRoute }) => {
  const maxDate = new Date(Date.now()).toISOString().split("T")[0];
  const [date, setDate] = useState({
    from: "2024-01-01",
    to: maxDate,
  });
  const dataRoute =
    requestRoute.results &&
    requestRoute.results.find((el) => el.idVariable === dataToSee);
  const chartContainerRef = useRef();
  const { request, setRequest } = useFetch({
    url: `https://api.bcra.gob.ar/estadisticas/v1/DatosVariable/${dataToSee}/${date.from}/${date.to}`,
  });
  const handlerDates = (e) => {
    setDate((antState) => ({ ...antState, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    setRequest({
      url: `https://api.bcra.gob.ar/estadisticas/v1/DatosVariable/${dataToSee}/${date.from}/${date.to}`,
    });
  }, [date.from, date.to, dataToSee, setRequest]);

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };
    const chart = createChart(chartContainerRef.current, {
      width: 300,
      height: 300,
      layout: {
        background: {
          type: configCssGraphic.areaTopColor,
          color: configCssGraphic.backgroundColor,
        },
        textColor: configCssGraphic.textColor,
      },
    });
    chart.timeScale().fitContent();
    const lineSeries = chart.addLineSeries();
    request.results &&
      lineSeries.setData(
        request.results.map((result) => {
          const fechaParts = result.fecha.split("/");
          return {
            time: `${fechaParts[2]}-${fechaParts[1]}-${fechaParts[0]}`,
            value: parseFloat(result.valor),
          };
        })
      );
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [request.results, dataToSee]);

  return (
    <div>
      <div className="box-conteiner-dates">
        <div className="box-dates">
          <label htmlFor="from">FROM</label>
          <input
            type="date"
            name="from"
            min={"2024-01-01"}
            max={date.to}
            defaultValue={date.from}
            onChange={(e) => handlerDates(e)}
          />
        </div>
        <div className="box-dates">
          <label htmlFor="to">TO</label>
          <input
            type="date"
            name="to"
            min={date.from}
            max={maxDate}
            defaultValue={date.to}
            onChange={(e) => handlerDates(e)}
          />
        </div>
        {dataRoute && (
          <div>
            <p>{dataRoute.descripcion}</p>
          </div>
        )}
      </div>
      <div className="graph" ref={chartContainerRef} id={dataToSee}></div>
    </div>
  );
};

ProyectData.propTypes = {
  dataToSee: PropTypes.number,
};

export default ProyectData;
