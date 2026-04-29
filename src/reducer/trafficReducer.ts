import type { Action, Direction, State } from "../types/traffic.types";

const order: Direction[] = ["TOP", "RIGHT", "BOTTOM", "LEFT"];

const getNextDirection = (current: Direction): Direction => {
    const index = order.indexOf(current);
    return order[(index + 1) % order.length];
}

export const trafficReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "TICK": {
            const updatedSignals = Object.keys(state.signals).reduce((acc, dir) => {
                const direction = dir as Direction;
                const currentCount = state.signals[direction].vehicleCount;

                let newCount;
                const incoming = Math.floor(Math.random() * 2);

                if (direction === state.currentGreen) {
                    //GREEN - overall decrease as vehicles pass through
                    newCount = Math.max(0, currentCount - 3 + incoming);
                } else {
                    //RED - increase as vehicles accumulate
                    newCount = currentCount + 2 + incoming;
                }

                acc[direction] = { vehicleCount: newCount };
                return acc;
            }, {} as State["signals"]);

            if (state.timer > 1) {
                return {
                    ...state,
                    timer: state.timer - 1,
                    signals: updatedSignals
                };
            } else {
                const next = getNextDirection(state.currentGreen);

                return {
                    ...state,
                    currentGreen: next,
                    timer: state.duration[next],
                    signals: updatedSignals
                }
            }
        }
        
        default: return state;
    }
};