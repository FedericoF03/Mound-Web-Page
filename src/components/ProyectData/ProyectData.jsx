import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import useFetch from "../../Hooks/useFetch";
import { createChart } from "lightweight-charts";

const configCssGraphic = {
  backgroundColor: "white",
  lineColor: "#2962FF",
  textColor: "black",
  areaTopColor: "#2962FF",
  areaBottomColor: "rgba(41, 98, 255, 0.28)",
};

const ProyectData = ({ dataToSee }) => {
  const [date, setDate] = useState({
    from: "2024-02-01",
    to: "2024-02-05",
  });
  const chartContainerRef = useRef();
  const { request, handlerRequest, error, handlerError, setRequest } = useFetch(
    {
      url: `https://api.bcra.gob.ar/estadisticas/v1/DatosVariable/${dataToSee}/${date.from}/${date.to}`,
    }
  );

  const handlerDates = (e) => {
    setDate((antState) => ({ ...antState, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    console.log("va");
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
          console.log(result);
          return {
            time: new Date(result.fecha).toISOString().split("T")[0],
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
      <div>
        <input
          type="date"
          name="from"
          min={"2024-01-01"}
          max={date.to}
          defaultValue={date.from}
          onClick={(e) => handlerDates(e)}
        />
        <input
          type="date"
          name="to"
          onClick={(e) => handlerDates(e)}
          max={new Date(Date.now()).toISOString().split("T")[0]}
          min={date.from}
          defaultValue={date.to}
        />
        <p>Date</p>
      </div>
      <div ref={chartContainerRef} id={dataToSee}></div>
    </div>
  );
};

ProyectData.propTypes = {
  dataToSee: PropTypes.number,
};

export default ProyectData;
