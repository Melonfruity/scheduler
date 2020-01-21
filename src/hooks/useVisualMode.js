import { useState } from 'react';

const useVisualMode = (defaultMode) => {

  const [mode, setMode] = useState(defaultMode);
  const [prevMode, setPrevMode] = useState(mode);
  // const [currMode, setCurrMode] = useState('');

  const transition = (nextMode) => {
    setPrevMode(mode);
    setMode(nextMode);
  }
  const back = () => setMode(prevMode);

  return {
    mode,
    transition,
    back,
  }
}

export default useVisualMode