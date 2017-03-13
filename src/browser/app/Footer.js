/* @flow */
import React from 'react';
import { Link } from 'found';
import { Footer } from '../components';
import { FormattedMessage, defineMessages } from 'react-intl';

const messages = defineMessages({
  madeByHtml: {
    defaultMessage: 'Based on Daniel Steigerwald\'s lovely Este-Stack, written by',
    id: 'footer.madeByHtml',
  },
});

const AppFooter = () => (
  <Footer>
    <FormattedMessage {...messages.madeByHtml} />
    {'\u00a0'}
    <Link to="https://twitter.com/cjk">
      CjK
    </Link>
  </Footer>
);

export default AppFooter;
