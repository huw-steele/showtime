import { Store } from "redux";
import { createSetVideoAction, createPlayAction } from "./reducer";


class Maestro {

  private store: Store | null = null;
  private socket: WebSocket | null = null;

  init = (store: Store) => {
    this.store = store;
  }

  connect = (showId: string) => {
    this.socket = new WebSocket(`ws://94.173.180.77:89/api/shows/${showId}/connect`);

    this.socket.onmessage = this.handleMessage;
  }

  disconnect = () => {
    if (this.socket === null) return;
    this.socket.close();
    this.socket = null;
  }

  sendVideo = (videoId: string) => {
    if (this.socket === null) return;
    this.socket.send(`VIDEO%%${videoId}`);
  }

  playVideo = () => {
    if (this.socket === null) return;
    this.socket.send(`PLAY`);
  }

  private handleMessage = (ev: MessageEvent) => {
    if (this.store === null) return;
    let parts = ev.data.split("%%");
    switch (parts[0]) {
      case "VIDEO":
        this.store.dispatch(createSetVideoAction(parts[1]));
        break;
      case "PLAY":
        this.store.dispatch(createPlayAction());
        break;
    }
  }
}

export let maestro = new Maestro();