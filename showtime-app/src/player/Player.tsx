import * as React from 'react';
import YouTube from 'react-youtube';

interface OwnProps {
  videoId: string;
  playing: boolean;
}

interface State {
  
}

class Player extends React.Component<OwnProps, State> {

  private player: any;
  
  constructor(props: OwnProps) {
    super(props);
    this.state = {
      player: null
    };
  }

  shouldComponentUpdate = (nextProps: OwnProps, nextState: State): boolean => {
    if (nextProps.videoId !== this.props.videoId && nextProps.videoId !== null) {
      this.player.cueVideoById(nextProps.videoId);
    }
    if (nextProps.playing) {
      this.player.seekTo(0, true);
      this.player.playVideo();
    }
    return false;
  }

  private onReady = (ev: any) => this.player = ev.target;

  render = () => (
    <div>
      <YouTube
        onReady={this.onReady}
        videoId={this.props.videoId}
      />
    </div>
  );
}

export default Player; 