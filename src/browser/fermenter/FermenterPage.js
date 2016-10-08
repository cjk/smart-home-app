/* @flow */
import Helmet from 'react-helmet';
import React, { Component, PropTypes } from 'react';
import smartHomeConnect from '../../common/home/connector';
import * as fermenterActions from '../../common/fermenter/actions';
import TempHumidityInfo from './TempHumidity';
import Commander from './Commander';
import { connect } from 'react-redux';
import linksMessages from '../../common/app/linksMessages';
import { injectIntl, intlShape } from 'react-intl';

class FermenterPage extends Component {
  /* TODO: Refactor out in HOC + action */
  componentDidMount() {
    const { processState } = this.props;
    const { subscribeToFermenterState } = smartHomeConnect();

    subscribeToFermenterState(processState);
  }

  render() {
    const { intl, fermenter, fermenterStart, fermenterStop } = this.props;
    const runtimeState = fermenter.get('rts');

    const title = intl.formatMessage(linksMessages.fermenter);

    return (
      <div className="events-page" id="events">
        <Helmet title={title} />
        <Commander runtimeState={runtimeState} fermenterStart={fermenterStart} fermenterStop={fermenterStop} />
        <TempHumidityInfo fermenterState={fermenter} />
      </div>
    );
  }
}

FermenterPage.propTypes = {
  intl: intlShape.isRequired,
  fermenter: PropTypes.object.isRequired,
  processState: PropTypes.func.isRequired,
  fermenterStart: PropTypes.func.isRequired,
  fermenterStop: PropTypes.func.isRequired,
};

FermenterPage = injectIntl(FermenterPage);

export default connect(state => ({
  fermenter: state.fermenter,
}), fermenterActions)(FermenterPage);
