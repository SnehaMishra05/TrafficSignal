import { useEffect, useReducer } from "react";
import { initialState, reducer } from "../store/trafficReducer";

export const useTrafficSignal = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (state.count === 0) {
                dispatch({ type: 'NEXT_LIGHT' });
            } else {
                dispatch({ type: 'TICK' });
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [state]);

    return { state, dispatch };
};