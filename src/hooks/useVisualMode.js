import { useState } from 'react';

export const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // moves to the next mode and saves in history only if it is not in a error state
  const transition = (newMode, replace) => {
    if (!replace) {
      setHistory([...history, newMode])
    }
    setMode(newMode);
  };

  // transistion to an history entry before current and update history
  const back = () => {
    if (history.length === 1) return;
    let hstory = history.slice(0,history.length - 1)
    setHistory([...hstory])
    setMode(history[history.length - 2])
  };
  
  return {
    mode,
    transition,
    back
  };
};