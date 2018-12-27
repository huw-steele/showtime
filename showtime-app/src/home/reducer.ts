import { Action, AnyAction } from "redux";
import { Reducer } from "react";
import { History } from 'history';
import { createShow } from "../core/api";

// STATE

export interface HomeState {
  creating: boolean;
}

const defaultState: HomeState = {
  creating: false
};

// ACTIONS

interface CreateShowAction extends Action {
  type: "HOME/CREATE_SHOW";
}

interface CreateShowSuccessAction extends Action {
  type: "HOME/CREATE_SHOW_SUCCESS";
}

interface CreateShowFailureAction extends Action {
  type: "HOME/CREATE_SHOW_FAILURE";
}

type HomeActions = CreateShowAction | CreateShowSuccessAction | CreateShowFailureAction;

// CREATORS

export const createCreateShowAction = (history: History<any>) => {
  return (dispatch: any) => {
    dispatch(showCreating());
    createShow()
      .then(id => {
        dispatch(showCreated());
        history.push(`/shows/${id}`);
      })
      .catch(_ => {
        dispatch(showCreateFailed())
      })
  }
}

const showCreating = (): CreateShowAction => ({
  type: "HOME/CREATE_SHOW"
})

const showCreated = (): CreateShowSuccessAction => ({
  type: "HOME/CREATE_SHOW_SUCCESS"
})

const showCreateFailed = (): CreateShowFailureAction => ({
  type: "HOME/CREATE_SHOW_FAILURE"
})

// REDUCER

const homeReducer: Reducer<HomeState | undefined, AnyAction> = (state: HomeState | undefined = defaultState, action: HomeActions) => {
  switch (action.type) {
    case "HOME/CREATE_SHOW":
      return { ...state, creating: true };
    case "HOME/CREATE_SHOW_SUCCESS":
      return { ...state, creating: false };
    case "HOME/CREATE_SHOW_FAILURE":
      return { ...state, creating: false };
    default:
      return state;
  }
}

export default homeReducer;