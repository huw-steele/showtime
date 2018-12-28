import * as React from 'react';
import YouTube from 'react-youtube';

interface OwnProps {
  videoId: string;
  playing: boolean;
  pause: () => void;
  play: () => void;
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
    if (!this.player) return true;
    if (nextProps.videoId !== this.props.videoId && nextProps.videoId !== null) {
      this.player.cueVideoById(nextProps.videoId);
      this.player.seekTo(0, true);
    }
    if (nextProps.playing && !this.props.playing) {      
      this.player.playVideo();
    }
    if (!nextProps.playing && this.props.playing) {
      this.player.pauseVideo();
    }
    return false;
  }

  private onReady = (ev: any) => this.player = ev.target;

  render = () => (
    <div>
      <YouTube
        onReady={this.onReady}
        onPlay={this.props.play}
        onPause={this.props.pause}
        videoId={this.props.videoId}
        opts={{
          playerVars: {
            controls: 1
          }
        }}
      />
    </div>
  );
}

export default Player; 