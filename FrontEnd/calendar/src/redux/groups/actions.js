import {CLEAN_GROUPS, SAVE_GROUPS} from "./types";

export const saveGroups = (groups) => {
    return {
        type: SAVE_GROUPS,
        groups
    };
};

export const cleanGroup = () => {
    return {
        type: CLEAN_GROUPS
    }
}
