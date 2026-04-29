import React from "react";
import type { State } from "../types/traffic.types";
import { trafficReducer } from "../reducer/trafficReducer";

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
    }
};

export const useTrafficSignal = () => {
    const [state, dispatch] = React.useReducer(trafficReducer, initialState);
    
    React.useEffect(() => {
        const interval = setInterval(() => {
            dispatch({ type: "TICK" });
        }, 1000);

        return ()=> clearInterval(interval);
    }, []);

    return state;
}