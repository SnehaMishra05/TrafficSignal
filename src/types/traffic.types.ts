export type Direction = "TOP" | "BOTTOM" | "LEFT" | "RIGHT";

export type State = {
    currentGreen: Direction;
    timer: number;
    duration: Record<Direction, number>;
}

export type Action = | { type: "TICK" } | { type: "SWITCH" };