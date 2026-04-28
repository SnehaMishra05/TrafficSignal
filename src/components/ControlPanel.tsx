import { type Light } from "../types/traffic.types";
import styles from "./TrafficSignal.module.css";

const ControlPanel = ({ dispatch, timings, isPaused }: any) => {
    const handleChane = (color: Light, value: number) => {
        dispatch({ type: 'UPDATE_TIMINGS', payload: { ...timings, [color]: value } });
    };

    return (
        <div className={styles.controlPanel}>
            <h3>⚙️ Timings (seconds)</h3>
            {(["red", "yellow", "green"] as Light[]).map(color => (
                <div key={color} className={styles.timingControl}>
                    <label>{color}</label>
                    <input
                        type="number"
                        min="1"
                        max="20"
                        value={timings[color]}
                        onChange={(e) => handleChane(color, parseInt(e.target.value))}
                    />
                </div>
            ))}

            <div className={styles.controlButtons}>
                <button onClick={() => dispatch({type:'TOGGLE_PAUSE'})}>
                    {isPaused ? '▶ Resume' : '⏸ Pause'}
                </button>

                <button onClick={() => dispatch({type: 'RESET'})}>
                    🔄 Reset
                </button>
            </div>
        </div>
    )
}

export default ControlPanel;