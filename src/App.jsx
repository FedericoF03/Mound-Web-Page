import { useEffect, useState } from "react";

import "./App.css";

import useDisplay from "./Hooks/useDisplay";
import useFetch from "./Hooks/useFetch";

import Menu from "./components/Menu/Menu";
import ProyectData from "./components/ProyectData/ProyectData";

import fetching from "./utils/fetch";

function App() {
  const { display, handlerDisplay } = useDisplay(false);
  const { request, handlerRequest, error, handlerError } = useFetch({
    url: "https://api.bcra.gob.ar/estadisticas/v1/principalesvariables",
  });
  const [dataToSee, setDataToSee] = useState(null);
  const [dataRequest, setDataRequest] = useState({});
  const [DataError, setHandlerDataError] = useState(null);

  useEffect(() => {
    const returnBody = () => {};
    const handlerDataError = (error) => {
      setHandlerDataError(error);
    };
    let check = true;
    if (check && dataRequest.url) {
      check = false;
      fetching(dataRequest.url, setDataRequest, returnBody, handlerDataError);
    }
    return () => (check = false);
  }, [dataRequest.url, dataToSee]);

  return (
    <>
      <h2>BCRA DATA PAGE</h2>
      {display && (
        <button className="button" onClick={handlerDisplay}>
          <img
            className="arrow"
            src="https://imgs.search.brave.com/1I27j8fDWAG2HFnJj6TpLlzDe1-PyYk3yXQ25_rccKE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4y/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvbWluaW1hbGlz/dC1hcnJvd3Mtc2V0/LzEwMC9BUlJPVy1l/eHBhbmRfc2ltcGxl/X2Fycm93LTEyOC5w/bmc"
            alt="arrow"
          />
        </button>
      )}
      {!error && !display && request.results && (
        <Menu
          request={request}
          handlerDisplay={handlerDisplay}
          handlerRequest={handlerRequest}
          handlerError={handlerError}
          setDataToSee={setDataToSee}
        />
      )}
      {!DataError && display && dataToSee && (
        <ProyectData dataToSee={dataToSee} request={request} />
      )}
    </>
  );
}

export default App;
