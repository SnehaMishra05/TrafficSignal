export type Light = 'red' | 'yellow' | 'green';

export type TrafficState = {
    light: Light;
    count: number;
    pedestraianRequested: boolean;
    greenElapsed: number;
    isPaused: boolean;
    timings: Record<Light, number>;
}

export type Action =
    | { type: 'TICK' }
    | { type: 'NEXT_LIGHT' }
    | { type: 'PEDESTRIAN_REQUEST' }
    | { type: 'RESET' }
    | { type: 'TOGGLE_PAUSE' }
    | { type: 'UPDATE_TIMINGS'; payload: Record<Light, number> }
    ;
