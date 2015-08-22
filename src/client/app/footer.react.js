import Component from '../components/component.react';
import React from 'react';
import {FormattedHTMLMessage} from 'react-intl';

export default class Footer extends Component {

  static propTypes = {
    msg: React.PropTypes.object.isRequired
  }

  render() {
    const {msg} = this.props;

    return (
      <footer>
        <p>
          <FormattedHTMLMessage message={msg.madeByHtml} />
        </p>
      </footer>
    );
  }

}
