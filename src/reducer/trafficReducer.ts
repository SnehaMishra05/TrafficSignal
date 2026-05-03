import type { Action, Direction, State } from "../types/traffic.types";

const order: Direction[] = ["TOP", "RIGHT", "BOTTOM", "LEFT"];

const getNextDirection = (current: Direction): Direction => {
  const index = order.indexOf(current);
  return order[(index + 1) % order.length];
};

export const trafficReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "TICK": {
      
      // EMERGENCY MODE
      if (state.emergency) {
        if (state.currentGreen !== state.emergency) {
          return {
            ...state,
            currentGreen: state.emergency,
            phase: "GREEN",
            timer: 5,
          };
        }

        // countdown
        if (state.timer > 1) {
          return {
            ...state,
            timer: state.timer - 1,
          };
        }

        return {
          ...state,
          emergency: null,
          phase: "YELLOW",
          timer: 2,
        };
      }

      // Update Vehicle Count
      const updatedSignals = { ...state.signals };

      for (const dir in updatedSignals) {
        const d = dir as Direction;

        if (d === state.currentGreen) {
          // vehicles clear on green
          updatedSignals[d].vehicleCount = Math.max(
            0,
            updatedSignals[d].vehicleCount - 2,
          );
        } else {
          // vehicles increase on red
          updatedSignals[d].vehicleCount += 1;
        }
      }

      // countdown
      if (state.timer > 1) {
        return {
          ...state,
          timer: state.timer - 1,
          signals: updatedSignals,
        };
      }

      // GREEN → YELLOW
      if (state.phase === "GREEN") {
        return {
          ...state,
          phase: "YELLOW",
          timer: 2,
          signals: updatedSignals,
        };
      }

      // YELLOW → NEXT SIGNAL

      const nextDefault = getNextDirection(state.currentGreen);

      // pick direction with max vehicles
      let maxDir: Direction = nextDefault;
      let maxCount = -1;

      for (const dir in updatedSignals) {
        const d = dir as Direction;
        const count = updatedSignals[d].vehicleCount;

        if (count > maxCount) {
          maxCount = count;
          maxDir = d;
        }
      }

      // choose smarter direction only if difference is noticeable
      const next =
        maxCount > updatedSignals[nextDefault].vehicleCount + 2
          ? maxDir
          : nextDefault;

      // dynamic green time
      const vehicles = updatedSignals[next].vehicleCount;
      const extraTime = vehicles > 5 ? 2 : 0;

      return {
        ...state,
        currentGreen: next,
        phase: "GREEN",
        timer: 5 + extraTime,
        signals: updatedSignals,
      };
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
