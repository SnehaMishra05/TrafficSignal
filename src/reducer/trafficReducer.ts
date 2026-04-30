import type { Action, Direction, State } from "../types/traffic.types";

const order: Direction[] = ["TOP", "RIGHT", "BOTTOM", "LEFT"];

const getPriorityDirection = (signals: State["signals"]): Direction | null => {
    let maxDir: Direction | null = null;
    let maxCount = -Infinity;

    for (const dir in signals) {
        const direction = dir as Direction;
        const count = signals[direction].vehicleCount;

        if (count > maxCount) {
            maxCount = count;
            maxDir = direction;
        }
    }
    return maxDir;
};

const getNextDirection = (current: Direction): Direction => {
    const index = order.indexOf(current);
    return order[(index + 1) % order.length];
};

export const trafficReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "TICK": {
            if (state.emergency) {
                // If not already green → switch immediately
                if (state.currentGreen !== state.emergency) {
                    return {
                        ...state,
                        currentGreen: state.emergency,
                        timer: state.duration[state.emergency],
                    };
                }

                // If already green → extend time
                return {
                    ...state,
                    timer: state.timer + 1,
                };
            }
            const updatedSignals = Object.keys(state.signals).reduce(
                (acc, dir) => {
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
                },
                {} as State["signals"],
            );

            if (state.timer > 1) {
                return {
                    ...state,
                    timer: state.timer - 1,
                    signals: updatedSignals,
                };
            } else {
                // const next = getNextDirection(state.currentGreen);

                const currentVehicles =
                    updatedSignals[state.currentGreen].vehicleCount;

                // ✅ NEW: extend if still crowded
                if (currentVehicles > 5) {
                    return {
                        ...state,
                        timer: 2, // small extension (not full reset)
                        signals: updatedSignals,
                    };
                }

                const priority = getPriorityDirection(updatedSignals);

                let next;

                if (priority && priority !== state.currentGreen) {
                    next = priority;
                } else {
                    next = getNextDirection(state.currentGreen);
                }

                return {
                    ...state,
                    currentGreen: next,
                    timer: state.duration[next],
                    signals: updatedSignals,
                };
            }
        }

        case "SET_EMERGENCY":
            return {
                ...state,
                emergency: action.payload,
            };

        default:
            return state;
    }
};
