import { useState } from "react";

const useDisplay = (statusInit) => {
  const [display, setDisplay] = useState(statusInit);
  const handlerDisplay = () => setDisplay((antDis) => !antDis);
  return { display, handlerDisplay };
};

export default useDisplay;
