import { combineReducers } from "redux";
import showReducer, { ShowState } from "./show/reducer";


const rootReducer = combineReducers({
    show: showReducer
});

export interface RootState {
    show: ShowState
}

export default rootReducer;
