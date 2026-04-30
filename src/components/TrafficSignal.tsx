import { useTrafficSignal } from "../hooks/useTrafficSignal";
import styles from "./TrafficSignal.module.css";

const TrafficSignal = () => {
  const { currentGreen, timer, signals, dispatch } = useTrafficSignal();

  const renderLight = (direction: string, positionClass: string) => {
    const isActive = currentGreen === direction;
    const vehicles = signals[direction].vehicleCount;

    return (
      <>
        <div
          className={`${styles.light} ${styles[positionClass]} ${
            isActive ? styles.activeGreen : styles.inactive
          }`}
        >
          {isActive && <span>{timer}</span>}
        </div>

        <div
          className={`${styles.vehicleCount} ${styles[`vehicle${positionClass}`]}`}
        >
          {vehicles}
        </div>
      </>
    );
  };

  return (
    <div>
      <h2 className={styles.title}>Smart Traffic System</h2>
      <div className={styles.container}>
        {renderLight("TOP", "top")}
        {renderLight("RIGHT", "right")}
        {renderLight("BOTTOM", "bottom")}
        {renderLight("LEFT", "left")}
      </div>

      <div className={styles.controls}>
        <button
          onClick={() => dispatch({ type: "SET_EMERGENCY", payload: "TOP" })}
        >
          🚑 TOP
        </button>

        <button
          onClick={() => dispatch({ type: "SET_EMERGENCY", payload: "RIGHT" })}
        >
          🚑 RIGHT
        </button>

        <button
          onClick={() => dispatch({ type: "SET_EMERGENCY", payload: "BOTTOM" })}
        >
          🚑 BOTTOM
        </button>

        <button
          onClick={() => dispatch({ type: "SET_EMERGENCY", payload: "LEFT" })}
        >
          🚑 LEFT
        </button>

        <button
          onClick={() => dispatch({ type: "SET_EMERGENCY", payload: null })}
        >
          ❌ Clear
        </button>
      </div>
    </div>
  );
};

export default TrafficSignal;
