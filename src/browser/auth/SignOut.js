/* @flow */
import React from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import { FormattedMessage } from 'react-intl';
import { Button, View } from '../app/components';
import { connect } from 'react-redux';
import { signOut } from '../../common/auth/actions';

type SignOutProps = { signOut: typeof signOut };
type SignOutContext = { router: any };

const SignOut = ({ signOut }: SignOutProps, { router }: SignOutContext) => {
  const onClick = () => {
    // We have to redirect to home before signOut.
    router.transitionTo({ pathname: '/' });
    // TODO: Router should provide onCompleted callback.
    setImmediate(signOut);
  };
  return (
    <View>
      <Button onClick={onClick}>
        <FormattedMessage {...buttonsMessages.signOut} />
      </Button>
    </View>
  );
};

SignOut.contextTypes = { router: React.PropTypes.object };

export default connect(
  null,
  { signOut },
)(SignOut);
