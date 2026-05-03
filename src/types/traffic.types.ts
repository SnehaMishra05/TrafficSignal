export type Direction = "TOP" | "RIGHT" | "BOTTOM" | "LEFT";

export type SignalPhase = "GREEN" | "YELLOW";

export type State = {
  currentGreen: Direction;
  phase: SignalPhase;
  timer: number;
  signals: Record<Direction, { vehicleCount: number }>;
  emergency: Direction | null;
};

export type Action =
  | { type: "TICK" }
  | { type: "SET_EMERGENCY"; payload: Direction | null };