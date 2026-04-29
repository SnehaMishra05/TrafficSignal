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
}

export type Action = { type: "TICK" };