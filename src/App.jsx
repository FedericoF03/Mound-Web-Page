import { useEffect, useState } from "react";
import "./App.css";
import useDisplay from "./Hooks/useDisplay";
import useFetch from "./Hooks/useFetch";
import Menu from "./components/Menu/Menu";
import fetching from "./utils/fetch";

function App() {
  const { display, handlerDisplay } = useDisplay(false);
  const { request, handlerRequest, error, handlerError } = useFetch({
    url: "https://api.bcra.gob.ar/estadisticas/v1/principalesvariables",
  });
  const [dataToSee, setDataToSee] = useState(null);
  const [dataRequest, setDataRequest] = useState({});
  const [DataError, setHandlerDataError] = useState({});
  useEffect(() => {
    const returnBody = () => {};
    const handlerDataError = () => {};
    let check = true;
    if (check && dataRequest.url) {
      check = false;
      fetching(dataRequest.url, setDataRequest, returnBody, handlerDataError);
    }
    return () => (check = false);
  }, [dataRequest.url, dataToSee]);

  return (
    <>
      {/*Burger button*/}
      <button onClick={handlerDisplay} />
      {!error && display && (
        <Menu
          request={request}
          handlerDisplay={handlerDisplay}
          handlerRequest={handlerRequest}
          handlerError={handlerError}
          setDataToSee={setDataToSee}
        />
      )}
      <p>{dataToSee}</p>
    </>
  );
}

export default App;
