import { useEffect, useState } from "react";
import fetching from "../utils/fetch";

const useFetch = (dataRequest) => {
  const [request, setRequest] = useState(dataRequest);
  const [error, setError] = useState(null);

  const handlerRequest = (data) => setRequest(() => data);
  const handlerError = (data) => setError(() => data);
  const returnBody = (dataAntState, res) => ({
    ...dataAntState,
    results: res.results,
  });

  useEffect(() => {
    let check = true;
    if (check) {
      check = false;
      fetching(request.url, setRequest, returnBody, handlerError);
    }
    return () => (check = false);
  }, [request.url]);

  return { request, handlerRequest, error, handlerError };
};

export default useFetch;
