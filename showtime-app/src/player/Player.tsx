import * as React from 'react';
import YouTube from 'react-youtube';

interface OwnProps {
  videoId: string;
  playing: boolean;
  startTime: number;
  pause: () => void;
  play: (startTime: number) => void;
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
      this.player.cueVideoById(nextProps.videoId, 0);
      this.player.seekTo(0, true);
    }
    if (nextProps.startTime !== this.props.startTime) {
      this.player.seekTo(nextProps.startTime);
    }
    if (nextProps.playing && !this.props.playing) {      
      this.player.playVideo();
    }
    if (!nextProps.playing && this.props.playing) {
      this.player.pauseVideo();
    }    
    return false;
  }

  private onPlay = () => this.props.play(Math.floor(this.player.getCurrentTime()));

  private onReady = (ev: any) => this.player = ev.target;

  render = () => (
    <div>
      <YouTube
        onReady={this.onReady}
        onPlay={this.onPlay}
        onPause={this.props.pause}
        videoId={this.props.videoId}
        opts={{
          width: '1280',
          height: '720',
          playerVars: {
            controls: 1
          }
        }}
      />
    </div>
  );
}

export default Player; 