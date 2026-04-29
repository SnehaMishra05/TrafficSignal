import type { Action, Direction, State } from "../types/traffic.types";

const order: Direction[] = ["TOP", "RIGHT", "BOTTOM", "LEFT"];

const getNextDirection = (current: Direction): Direction => {
    const index = order.indexOf(current);
    return order[(index + 1) % order.length];
}

export const trafficReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "TICK":
            if (state.timer > 1) {
                return { ...state, timer: state.timer - 1 };
            } else {
                const next = getNextDirection(state.currentGreen);
                return {
                    ...state,
                    currentGreen: next,
                    timer: state.duration[next]
                };
            }
        
        default: return state;
    }
};