//types -> initial state -> reducer logic -> component/UI

export type Direction = "TOP" | "BOTTOM" | "LEFT" | "RIGHT";

export type State = {
    currentGreen: Direction;
    timer: number;
    duration: Record<Direction, number>;
    signals: {
        [key in Direction]: {
            vehicleCount: number;
        }
    }
    emergency: Direction | null;
}

export type Action = | { type: "TICK" } | { type: "SET_EMERGENCY", payload: Direction | null };