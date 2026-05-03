import { useTrafficSignal } from "../hooks/useTrafficSignal";
import type { Direction } from "../types/traffic.types";
import styles from "./TrafficSignal.module.css";

const directions: Direction[] = ["TOP", "RIGHT", "BOTTOM", "LEFT"];

const TrafficSignal = () => {
  const { currentGreen, timer, phase, signals, dispatch } = useTrafficSignal();

  const renderLight = (direction: Direction, positionClass: string) => {
    const isActive = currentGreen === direction;
    const vehicles = signals[direction].vehicleCount;

    return (
      <div key={direction}>
        {/* 🚦 Light */}
        <div
          className={`${styles.light} ${styles[positionClass]} ${
            isActive
              ? phase === "GREEN"
                ? styles.activeGreen
                : styles.activeYellow
              : styles.activeRed
          }`}
        >
          {isActive && <span>{timer}</span>}
        </div>

        {/* Vehicle Count */}
        <div
          className={`${styles.vehicleCount} ${
            styles[`vehicle${positionClass}`]
          }`}
        >
          <div>🚗 {vehicles}</div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Traffic Signal</h2>

      <div className={styles.signalContainer}>
        <div className={styles.signalBox}></div>
        {directions.map((dir) => renderLight(dir, dir.toLowerCase()))}
      </div>

      {/* Emergency Buttons */}
      <div className={styles.emergencyPanel}>
        {directions.map((dir) => (
          <button
            key={dir}
            onClick={() => dispatch({ type: "SET_EMERGENCY", payload: dir })}
          >
            🚑 {dir}
          </button>
        ))}

        <button
          onClick={() => dispatch({ type: "SET_EMERGENCY", payload: null })}
        >
          ❌ Stop Emergency
        </button>
      </div>
    </div>
  );
};

export default TrafficSignal;
