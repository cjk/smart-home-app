import Component from 'react-pure-render/component';
import React from 'react';
import { FormattedHTMLMessage, defineMessages } from 'react-intl';

// Messages collocation ftw.
// https://github.com/yahoo/react-intl/wiki/API#definemessages
const messages = defineMessages({
  madeBy: {
    defaultMessage: 'written by <a href=\"https://twitter.com/cjk\">CjK</a>, based on steida\'s Este.js',
    id: 'footer.madeBy'
  }
});

export default class Footer extends Component {

  render() {
    return (
      <footer>
        <p>
          <FormattedHTMLMessage {...messages.madeBy} />
        </p>
      </footer>
    );
  }
}
