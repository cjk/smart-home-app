import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

class Footer extends Component {

  static propTypes = {
    msg: PropTypes.object.isRequired
  };

  render() {
    const { msg } = this.props;

    return (
      <footer>
        <p>
          <FormattedMessage id="madeBy" defaultMessage={msg.madeBy} />
        </p>
      </footer>
    );
  }
}

export default connect(state => ({
  msg: state.intl.msg.app.footer
}))(Footer);
