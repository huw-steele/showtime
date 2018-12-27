import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Input from 'reactstrap/lib/Input';

interface OwnProps {
  isOpen: boolean;
  confirm: (videoId: string) => void;
  close: () => void;
}

interface State {
  videoId: string;
}

class SelectVideo extends React.PureComponent<OwnProps, State> {

  constructor(props: OwnProps) {
    super(props);

    this.state = { videoId: '' };
  }

  handleConfirm = () => {    
    this.props.confirm(this.state.videoId);
    this.setState({ videoId: '' });
  }

  handleCancel = () => {
    this.props.close();
    this.setState({ videoId: '' });
  }
  
  handleChange = (ev: any) => this.setState({ videoId: ev.target.value });

  render = () => (
    <Modal isOpen={this.props.isOpen} toggle={this.props.close}>
      <ModalHeader toggle={this.props.close}>Select video</ModalHeader>
      <ModalBody>
        <Input
          value={this.state.videoId}
          onChange={this.handleChange}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={this.handleConfirm}>Confirm</Button>{' '}
        <Button color="secondary" onClick={this.handleCancel}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
}

export default SelectVideo;