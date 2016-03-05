import Component from 'react-pure-render/component';
import fetch from '../../common/components/fetch';
import {fetchState} from '../../common/fermenter/actions';
import Helmet from 'react-helmet';
import React, {PropTypes} from 'react';
import TempHumidityInfo from './TempHumidity.react';
import {connect} from 'react-redux';

class Page extends Component {

  static propTypes = {
    msg: PropTypes.object.isRequired,
    fermenter: PropTypes.object,
  };

  render() {
    console.log(`Fermenter-Props: ${JSON.stringify(this.props)}`);
    const {msg: {title}, fermenter: fermenterState} = this.props;

    return (
      <div className="events-page" id="events">
        <Helmet title={title} />
        <TempHumidityInfo {...{fermenterState}} />
      </div>
    );
  }
}

Page = fetch(fetchState)(Page);

export default connect(state => ({
  msg: state.intl.msg.fermenter,
  fermenter: state.fermenter
}))(Page);
