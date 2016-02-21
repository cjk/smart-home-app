import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {HeaderRow, Navigation} from 'react-mdl/lib/Layout';

class Appbar extends Component {

  static propTypes = {
    msg: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired,
    viewer: PropTypes.object
  };

  render() {
    const {msg, viewer} = this.props;

    return (
      <HeaderRow>
      <Navigation>
      <Link to="/">Home</Link>
      <Link to="events">Events</Link>
      <Link to="fermenter">Fermenter</Link>
      <a href="">Link</a>
      </Navigation>
      </HeaderRow>
    );
  }
}

export default connect(state => ({
  msg: state.intl.msg.home
}))(Appbar);
