import { useEffect, useState } from "react";
import "./App.css";
import useDisplay from "./Hooks/useDisplay";
import useFetch from "./Hooks/useFetch";
import Menu from "./components/Menu/Menu";
import fetching from "./utils/fetch";
import ProyectData from "./components/ProyectData/ProyectData";

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
      {/*arrow button*/}
      {display && <button onClick={handlerDisplay}>{"<--"}</button>}
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
        <ProyectData dataToSee={dataToSee} />
      )}
    </>
  );
}

export default App;
