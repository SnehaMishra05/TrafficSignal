import { useTrafficSignal } from '../hooks/useTrafficSignal';
import styles from './TrafficSignal.module.css';

const TrafficSignal = () => {
    const light = useTrafficSignal();

    return (
        <div className='container'>
            <div className = {`${styles.light} ${styles.red} ${light === 'RED' ? styles.active : ''}`}></div>
            <div className = {`${styles.light} ${styles.yellow} ${light === 'YELLOW' ? styles.active : ''}`}></div>
            <div className = {`${styles.light} ${styles.green} ${light === 'GREEN' ? styles.active : ''}`}></div>
        </div>
    )
}

export default TrafficSignal;