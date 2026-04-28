import { useTrafficSignal } from "../hooks/useTrafficSignal";
import ControlPanel from "./ControlPanel";
import styles from "./TrafficSignal.module.css";

//mocked the Traffic signal as a finite state machine using useReducer with event based transitions
const TrafficSignal = () => {
    const { state, dispatch } = useTrafficSignal();
    const { light, count, timings, isPaused } = state;

    const getClass = (color: string) => {
        return `${styles.light} ${light === color ? styles[`active-${color}`] : ""}`;
    }

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.signalColumn}>
                    <div className={getClass("red")}>
                        {light === "red"? count : ""}
                    </div>
                    <div className={getClass("yellow")}>
                        {light === "yellow"? count : ""}
                    </div>
                    <div className={getClass("green")}>
                        {light === "green"? count : ""}
                    </div>

                    <button className={styles.pedestrianButton} onClick={() => dispatch({ type: 'PEDESTRIAN_REQUEST' })}>
                        🚶 Request Crossing
                    </button>
                </div>

                <ControlPanel timings={timings} isPaused={isPaused} dispatch={dispatch} />
            </div>
        </div>
    )
}

export default TrafficSignal;