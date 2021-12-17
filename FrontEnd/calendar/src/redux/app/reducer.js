import {CHANGE_SHOW_ADD_GROUP, CHANGE_SHOW_JOIN_GROUP, START_LOAD, STOP_LOAD} from "./types";

const INITIAL_STATE = {
    loading: true,
    addGroupModal: false,
    joinGroupModal: false,
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
        case CHANGE_SHOW_ADD_GROUP:
            return {
                ...state,
                addGroupModal: action.addGroupModal
            };
        case CHANGE_SHOW_JOIN_GROUP:
            return {
                ...state,
                joinGroupModal: action.joinGroupModal
            };
        default:
            return state;
    }
};

export default reducer;
