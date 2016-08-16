import React, { Component } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';

const messages = defineMessages({
  madeByHtml: {
    defaultMessage: 'Based on Daniel Steigerwald's lovely Este-Stack, written by',
    id: 'footer.madeByHtml',
  },
});

export default class Footer extends Component {

  render() {
    return (
      <footer>
        <p>
          <FormattedMessage {...messages.madeByHtml} />
          {' '}
          <a href="https://twitter.com/cjk">CjK</a>
        </p>
      </footer>
    );
  }
}
