import { START_LOAD, STOP_LOAD } from "./types";

const INITIAL_STATE = {
    loading: true,
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case START_LOAD:
            return {
                ...state,
                loading: true,
            };
        case STOP_LOAD:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};

export default reducer;
