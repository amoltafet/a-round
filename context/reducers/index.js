import { combineReducers } from "redux";
import authSlice from "./authSlice";
import nearbyUsersSlice from "./nearbyUsersSlice";

const rootReducer = combineReducers({
    auth: authSlice,
    nearbyUsers: nearbyUsersSlice,

});

export default rootReducer;