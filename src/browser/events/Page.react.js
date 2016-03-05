import Component from 'react-pure-render/component';
import Events from './Events.react';
import Helmet from 'react-helmet';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class Page extends Component {

  static propTypes = {
    msg: PropTypes.object,
    smartHome: PropTypes.object,
  };

  render() {
    const {msg, smartHome: {eventHistory: list}} = this.props;

    return (
      <div className="events-page" id="events">
        <Helmet title={msg.title} />
        <Events {...{list, msg}} />
      </div>
    );
  }
}

export default connect(state => ({
  msg: state.intl.msg.home,
  smartHome: state.smartHome
}))(Page);
