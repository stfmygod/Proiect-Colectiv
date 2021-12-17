import {CLEAN_GROUPS, SAVE_GROUPS} from "./types";

const INITIAL_STATE = {
   list: []
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_GROUPS:
            return {
                ...state,
                list: action.groups,
            };
        case CLEAN_GROUPS:
            return {
                ...state,
                list: [],
            };
        default:
            return state;
    }
};

export default reducer;
