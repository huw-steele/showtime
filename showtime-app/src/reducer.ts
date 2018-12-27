import { combineReducers } from "redux";
import showReducer, { ShowState } from "./show/reducer";
import homeReducer, { HomeState } from "./home/reducer";


const rootReducer = combineReducers({
    show: showReducer,
    home: homeReducer
});

export interface RootState {
    show: ShowState,
    home: HomeState
}

export default rootReducer;
