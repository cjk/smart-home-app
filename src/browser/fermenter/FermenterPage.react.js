import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import smartHomeConnect from '../../common/home/connector';
import * as fermenterActions from '../../common/fermenter/actions';
import TempHumidityInfo from './TempHumidity.react';
import Commander from './Commander.react';
import { connect } from 'react-redux';
import linksMessages from '../../common/app/linksMessages';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

class Page extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
    fermenter: PropTypes.object,
    processState: PropTypes.func.isRequired,
    fermenterStart: PropTypes.func.isRequired,
    fermenterStop: PropTypes.func.isRequired,
  };

  /* TODO: Refactor out in HOC + action */
  componentDidMount() {
    const { processState } = this.props;
    const { subscribeToFermenterState } = smartHomeConnect();

    subscribeToFermenterState(processState);
  }

  render() {
    const { intl, fermenter: state, fermenterStart, fermenterStop } = this.props;
    const status = state.get('status');

    const title = intl.formatMessage(linksMessages.fermenter);

    return (
      <div className="events-page" id="events">
        <Helmet title={title} />
        <Commander fermenterStatus={status} fermenterStart={fermenterStart} fermenterStop={fermenterStop} />
        <TempHumidityInfo state={state} />
      </div>
    );
  }
}

Page = injectIntl(Page);

export default connect(state => ({
  fermenter: state.fermenter
}), fermenterActions)(Page);
