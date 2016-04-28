import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import smartHomeConnect from '../../common/home/connector';
import { processState } from '../../common/fermenter/actions';
import TempHumidityInfo from './TempHumidity.react';
import Commander from './Commander.react';
import { connect } from 'react-redux';
import linksMessages from '../../common/app/linksMessages';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

class Page extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
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
    const { intl, fermenter: state } = this.props;
    const status = state.get('status');

    const title = intl.formatMessage(linksMessages.fermenter);

    return (
      <div className="events-page" id="events">
        <Helmet title={title} />
        <Commander fermenterStatus={status} />
        <TempHumidityInfo state={state} />
      </div>
    );
  }
}

Page = injectIntl(Page);

export default connect(state => ({
  fermenter: state.fermenter
}))(Page);
