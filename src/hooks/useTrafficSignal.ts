import React from "react";
import { trafficReducer } from "../reducer/trafficReducer";
import type { State } from "../types/traffic.types";

const initialState: State = {
  currentGreen: "TOP",
  phase: "GREEN",
  timer: 5,
  signals: {
    TOP: { vehicleCount: 4 },
    RIGHT: { vehicleCount: 7 },
    BOTTOM: { vehicleCount: 3 },
    LEFT: { vehicleCount: 6 },
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
