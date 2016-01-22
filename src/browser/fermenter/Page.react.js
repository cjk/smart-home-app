import Component from 'react-pure-render/component';
import fetch from '../components/fetch';
import {fetchState} from '../../common/fermenter/actions';
import Helmet from 'react-helmet';
import React, {PropTypes} from 'react';
import TempHumidityInfo from './TempHumidity.react';

class Page extends Component {

  static propTypes = {
    actions: PropTypes.object,
    msg: PropTypes.object,
    fermenter: PropTypes.object,
  }

  render() {
    const {actions, msg: {todos: msg}, fermenter: fermenterState} = this.props;

    return (
      <div className="events-page" id="events">
        <Helmet title={msg.title} />
        <TempHumidityInfo {...{fermenterState, actions, msg}} />
      </div>
    );
  }

}

export default fetch(fetchState)(Page);
