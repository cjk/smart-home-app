import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import messages from '../../common/notfound/messages';
import { View } from 'rebass';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Link, Title } from '../components';

const NotFoundPage = ({ intl }) => (
  <View>
    <Title message={linksMessages.notFound} />
    <Link exact to="/">
      <FormattedMessage {...messages.continue} />
    </Link>
  </View>
);

export default injectIntl(NotFoundPage);
