import * as React from 'react';
import { Button } from 'reactstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { RootState } from '../reducer';
import { connect } from 'react-redux';
import { History } from 'history';
import { createCreateShowAction } from './reducer';

interface StateProps {
  creating: boolean;
}

interface DispatchProps {
  createShow: (history: History<any>) => void;
}

type Props = StateProps & DispatchProps & RouteComponentProps;

const Home = (props: Props) => (
  <div>
    <Button
      color="primary"
      onClick={() => { if (!props.creating) props.createShow(props.history) }}
    >
      { !props.creating ? 'Create New Show' : 'Creating...' }
    </Button>
  </div>
);

const mapStateToProps = (state: RootState) : StateProps => ({
  creating: state.home.creating
});

const mapDispatchToProps = (dispatch: any) : DispatchProps => ({
  createShow: (history) => dispatch(createCreateShowAction(history))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));