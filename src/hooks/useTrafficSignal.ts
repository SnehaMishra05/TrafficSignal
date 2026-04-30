import React from "react";
import { trafficReducer } from "../reducer/trafficReducer";
import type { State } from "../types/traffic.types";

const initialState: State = {
  currentGreen: "TOP",
  timer: 5,
  duration: {
    TOP: 5,
    RIGHT: 4,
    BOTTOM: 6,
    LEFT: 3,
  },
  signals: {
    TOP: { vehicleCount: 5 },
    RIGHT: { vehicleCount: 3 },
    BOTTOM: { vehicleCount: 7 },
    LEFT: { vehicleCount: 2 },
  },
  emergency: null,
};

export const useTrafficSignal = () => {
  const [state, dispatch] = React.useReducer(trafficReducer, initialState);

  React.useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return { ...state, dispatch };
};
