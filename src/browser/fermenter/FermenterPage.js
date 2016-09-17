import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import smartHomeConnect from '../../common/home/connector';
import * as fermenterActions from '../../common/fermenter/actions';
import TempHumidityInfo from './TempHumidity';
import Commander from './Commander';
import { connect } from 'react-redux';
import linksMessages from '../../common/app/linksMessages';
import { injectIntl, intlShape } from 'react-intl';

class FermenterPage extends React.Component {

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
    const rts = state.get('rts');

    const title = intl.formatMessage(linksMessages.fermenter);

    return (
      <div className="events-page" id="events">
        <Helmet title={title} />
        <Commander fermenterRts={rts} fermenterStart={fermenterStart} fermenterStop={fermenterStop} />
        <TempHumidityInfo state={state} />
      </div>
    );
  }
}

FermenterPage = injectIntl(FermenterPage);

export default connect(state => ({
  fermenter: state.fermenter,
}), fermenterActions)(FermenterPage);
