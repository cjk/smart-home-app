import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import smartHomeConnect from '../../common/home/connector';
import { processState } from '../../common/fermenter/actions';
import TempHumidityInfo from './TempHumidity.react';
import { connect } from 'react-redux';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

const messages = defineMessages({
  title: {
    defaultMessage: 'Fermenter-closet',
    id: 'fermenter.title'
  }
});

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
    const { intl, fermenter: fermenterState } = this.props;
    const title = intl.formatMessage(messages.title);

    return (
      <div className="events-page" id="events">
        <Helmet title={ title } />
        <TempHumidityInfo {...{ fermenterState }} />
      </div>
    );
  }
}

Page = injectIntl(Page);

export default connect(state => ({
  fermenter: state.fermenter
}))(Page);
