import { combineReducers } from "redux";

import appReducer from "./app/reducer";
import userReducer from "./user/reducer";
import groupReducer from "./groups/reducer"

const rootReducer = combineReducers({
    app: appReducer,
    user: userReducer,
    group: groupReducer,
});

export default rootReducer;
