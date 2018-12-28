import { Action } from "redux";
import { Reducer } from "react";
import { maestro } from "./maestro";
import { number } from "prop-types";

// STATE

interface PayloadAction extends Action {
  payload: any
}

export interface ShowState {
  connected: boolean;
  videoId: string | null;
  playing: boolean;
  countdown: number;
  startTime: number;
}

const defaultState: ShowState = {
  connected: false,
  videoId: null,
  playing: false,
  countdown: 0,
  startTime: 0
};

// ACTIONS

interface SetVideoAction extends Action {
  type: "SHOW/SET_VIDEO";
  payload: {
    videoId: string;
  }
}

interface ShowConnectAction extends Action {
  type: "SHOW/CONNECT";
}

interface ShowConnectSuccessAction extends Action {
  type: "SHOW/CONNECT_SUCCESS";
}

interface ShowConnectFailureAction extends Action {
  type: "SHOW/CONNECT_FAILURE";
}

interface PlayAction extends PayloadAction {
  type: "SHOW/PLAY";
  payload: {
    startTime: number;
  }
}

interface PauseAction extends Action {
  type: "SHOW/PAUSE";
}

interface SetStartAction extends PayloadAction {
  type: "SHOW/SET_START";
  payload: {
    start: number;
  }
}

type ShowActions = SetVideoAction | ShowConnectAction | ShowConnectSuccessAction | ShowConnectFailureAction | PlayAction | PauseAction | SetStartAction;

// CREATORS

export const createSetVideoAction = (videoId: string): SetVideoAction => ({
  type: "SHOW/SET_VIDEO",
  payload: {
    videoId
  }
});

export const createShowConnectAction = (showId: string): ShowConnectAction => ({
  type: "SHOW/CONNECT",
});

const connecting = (): ShowConnectAction => ({
  type: "SHOW/CONNECT"
});

const connectionSuccess = (): ShowConnectSuccessAction => ({
  type: "SHOW/CONNECT_SUCCESS"
}) 

const connectionFailed = (): ShowConnectFailureAction => ({
  type: "SHOW/CONNECT_FAILURE"
});

export const createPlayAction = (startTime: number): PlayAction => ({
  type: "SHOW/PLAY",
  payload: {
    startTime
  }
});

export const createPauseAction = (): PauseAction=> ({
  type: "SHOW/PAUSE"
});

// REDUCER

const showReducer: Reducer<ShowState | undefined, PayloadAction> = (state: ShowState | undefined = defaultState, action: ShowActions) => {
  switch (action.type) {
    case "SHOW/CONNECT":
      return { ...state, connected: false };
    case "SHOW/CONNECT_SUCCESS":
      return {...state, connected: true };
    case "SHOW/SET_VIDEO":
      return { ...state, playing: false, videoId: action.payload.videoId };
    case "SHOW/PLAY":
      return { ...state, playing: true, startTime: action.payload.startTime };
    case "SHOW/PAUSE":
      return { ...state, playing: false };
    default:
      return state;
  }
}

export default showReducer;