import { LOG_IN, LOG_OUT } from "./types";

const INITIAL_STATE = {
    user: {},
    token: null,
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOG_IN:
            console.log(state, action);
            return {
                ...state,
                user: action.payload.data,
                token: action.payload.token,
            };
        case LOG_OUT:
            return {
                user: {},
                token: null,
            };
        default:
            return state;
    }
};

export default reducer;
