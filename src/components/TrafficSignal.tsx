import { useTrafficSignal } from "../hooks/useTrafficSignal";
import styles from "./TrafficSignal.module.css";

const TrafficSignal = () => {
    const { currentGreen, timer } = useTrafficSignal();
    
    const renderLight = (direction: string, positionClass: string) => {
        const isActive = currentGreen === direction;

        return (
            <div
                className={`${styles.light} ${styles[positionClass]} ${isActive ? styles.active : ""}`}>
                {isActive ? timer : ""}
            </div>
        );
    };

    return (
        <div className={styles.container}>
            {renderLight("TOP", "top")}
            {renderLight("RIGHT", "right")}
            {renderLight("BOTTOM", "bottom")}
            {renderLight("LEFT", "left")}
        </div>
    );
};

export default TrafficSignal;