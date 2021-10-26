import { LOG_IN, LOG_OUT } from "./types";

export const logIn = (data, token) => {
    return {
        type: LOG_IN,
        payload: {
            data,
            token,
        },
    };
};

export const logOut = () => {
    return {
        type: LOG_OUT,
    };
};
