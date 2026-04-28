import type { Action, Light, TrafficState } from "../types/traffic.types";

export const timingsDefault: Record<Light, number> = {
    red: 5,
    yellow: 2,
    green: 6,
}

const nextLight: Record<Light, Light> = {
    red: "green",
    green: "yellow",
    yellow: "red",
}

export const initialState: TrafficState = {
    light: "red",
    count: timingsDefault.red,
    pedestraianRequested: false,
    greenElapsed: 0,
    isPaused: false,
    timings: timingsDefault,
}

export function reducer(state: TrafficState, action: Action): TrafficState {
    switch (action.type) {
        case 'TICK':
            if (state.isPaused) return state;
            
            if (state.count > 0) {
                return {
                    ...state,
                    count: state.count - 1,
                    greenElapsed: state.light === "green" ? state.greenElapsed + 1 : state.greenElapsed,
                };
            }
            return state;
        
        case 'NEXT_LIGHT':
            let next = nextLight[state.light];
            let newCount = state.timings[next];
            let pedestrian = state.pedestraianRequested;

            if (next === 'red' && pedestrian) {
                newCount = 7;
                pedestrian = false;
            }

            return {
                ...state,
                light: next,
                count: newCount,
                pedestraianRequested: pedestrian,
                greenElapsed: 0,
            }
        
        case 'PEDESTRIAN_REQUEST':
            return {
                ...state,
                pedestraianRequested: true,
            }
        
        case 'TOGGLE_PAUSE':
            return {
                ...state,
                isPaused: !state.isPaused,
            }
        
        case 'UPDATE_TIMINGS':
            return {
                ...state,
                timings: action.payload,
            }
        
        case 'RESET':
            return {
                ...initialState,
                timings: state.timings,
            };
        
        default:
            return state;
    }
}