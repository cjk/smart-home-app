import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import smartHomeConnect from '../../common/home/connector';
import { processState } from '../../common/fermenter/actions';
import TempHumidityInfo from './TempHumidity.react';
import { connect } from 'react-redux';

class Page extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    msg: PropTypes.object.isRequired,
    fermenter: PropTypes.object,
  };

  /* TODO: Refactor out in HOC + action */
  componentDidMount() {
    const { dispatch } = this.props;
    const { subscribeToFermenterState } = smartHomeConnect();

    const boundProcessState = (state) => dispatch(processState(state));
    subscribeToFermenterState(boundProcessState);
  }

  render() {
    const { msg: { title }, fermenter: fermenterState } = this.props;

    return (
      <div className="events-page" id="events">
        <Helmet title={title} />
        <TempHumidityInfo {...{ fermenterState }} />
      </div>
    );
  }
}

export default connect(state => ({
  msg: state.intl.msg.fermenter,
  fermenter: state.fermenter
}))(Page);
