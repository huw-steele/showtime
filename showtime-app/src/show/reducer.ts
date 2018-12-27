import { Action } from "redux";
import { Reducer } from "react";

// STATE

interface PayloadAction extends Action {
  payload: any
}

export interface ShowState {
  videoId: string | null;
  playing: boolean;
  countdown: number;
}

const defaultState: ShowState = {
  videoId: null,
  playing: false,
  countdown: 0
};

// ACTIONS

interface SetVideoAction extends Action {
  type: "SHOW/SET_VIDEO";
  payload: {
    videoId: string
  }
}

type ShowActions = SetVideoAction;

// CREATORS

export const createSetVideoAction = (videoId: string): SetVideoAction => ({
  type: "SHOW/SET_VIDEO",
  payload: {
    videoId
  }
})

// REDUCER

const showReducer: Reducer<ShowState | undefined, PayloadAction> = (state: ShowState | undefined = defaultState, action: ShowActions) => {
  switch (action.type) {
    case "SHOW/SET_VIDEO":
      return { ...state, playing: false, videoId: action.payload.videoId };
    default:
      return state;
  }
}

export default showReducer;