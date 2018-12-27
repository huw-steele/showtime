import * as React from 'react';
import Button from 'reactstrap/lib/Button';
import Player from '../player/Player';
import SelectVideo from './SelectVideo';
import { RootState } from '../reducer';
import { createSetVideoAction } from './reducer';
import { connect } from 'react-redux';
import { maestro } from './maestro';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface OwnProps {  
  playing: boolean;
}

interface StateProps {
  videoId: string | null;
  playing: boolean;
}

interface DispatchProps {
  selectVideo: (videoId: string) => void;
}

type Props = OwnProps & StateProps & DispatchProps & RouteComponentProps<{showId:string}>;

interface State {
  isSelecting: boolean
}

class Show extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { isSelecting: false };
  }

  hideSelection = () => this.setState({ isSelecting: false });
  showSelection = () => this.setState({ isSelecting: true });
  confirmSelection = (videoId: string) =>  {
    this.setState({ isSelecting: false});    
    maestro.sendVideo(videoId);
  }
  play = () => maestro.playVideo();

  componentDidMount = () => {
    maestro.connect(this.props.match.params.showId);
  }

  render = () => (
    <div>
      <SelectVideo
        isOpen={this.state.isSelecting}
        close={this.hideSelection}
        confirm={this.confirmSelection}
      />
      <Button
        onClick={this.showSelection}
      >
        Select Video
      </Button>
      <Button
        onClick={this.play}
      >
        Play
      </Button>
      { 
        this.props.videoId !== null && (<Player videoId={this.props.videoId} playing={this.props.playing}/>)
      }      
    </div>
  );


}

const mapStateToProps = (state: RootState): StateProps => ({
  videoId: state.show.videoId,
  playing: state.show.playing
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  selectVideo: (videoId: string) => (dispatch(createSetVideoAction(videoId)))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Show));