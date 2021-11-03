import { LOG_IN, LOG_OUT } from "./types";

const INITIAL_STATE = {
    user: {},
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                user: action.payload,
            };
        case LOG_OUT:
            return {
                user: {},
            };
        default:
            return state;
    }
};

export default reducer;
