import React from 'react';
import type { Light } from '../types/traffic.types';

export const useTrafficSignal = (): Light => {

    const [light, setLight] = React.useState<Light>('RED');
    
    React.useEffect(() => {
        let timer: number;

        if (light === 'RED') {
            timer = setTimeout(() => setLight('GREEN'), 5000);
        } else if (light === 'GREEN') {
            timer = setTimeout(() => setLight('YELLOW'), 3000);
        } else {
            timer = setTimeout(() => setLight('RED'), 1000);
        }

        return () => clearTimeout(timer);
    }, [light]);

    return light;
}