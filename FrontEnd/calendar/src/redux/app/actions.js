import {CHANGE_SHOW_ADD_GROUP, CHANGE_SHOW_JOIN_GROUP, START_LOAD, STOP_LOAD} from "./types";

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

export const changeShowAddGroup = (addGroupModal) => {
    return {
        type: CHANGE_SHOW_ADD_GROUP,
        addGroupModal
    };
};

export const changeShowJoinGroup = (joinGroupModal) => {
    return {
        type: CHANGE_SHOW_JOIN_GROUP,
        joinGroupModal
    }
}
