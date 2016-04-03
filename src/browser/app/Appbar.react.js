import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { HeaderRow, Navigation } from 'react-mdl/lib/Layout';

class Appbar extends Component {

  static propTypes = {
    pathname: PropTypes.string.isRequired,
    viewer: PropTypes.object
  };

  render() {
    const { viewer } = this.props;

    /* MERGE-TODO: Use link-messages from ./linksMessages */
    return (
      <HeaderRow>
        <Navigation>
          <Link activeClassName="active" to="/">Home</Link>
          <Link activeClassName="active" to="/events">Events</Link>
          <Link activeClassName="active" to="/fermenter">Fermenter</Link>
        </Navigation>
      </HeaderRow>
    );
  }
}

export default connect(state => ({
  viewer: state.users.viewer
}))(Appbar);
