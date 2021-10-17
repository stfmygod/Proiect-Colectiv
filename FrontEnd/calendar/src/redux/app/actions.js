import { START_LOAD, STOP_LOAD } from "./types";

export const startLoad = () => {
    return {
        type: START_LOAD,
    };
};

export const stopLoad = () => {
    return {
        type: STOP_LOAD,
    };
};
