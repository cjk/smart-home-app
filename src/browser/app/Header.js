/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { Header } from 'react-mdl/lib/Layout';
import Appbar from './Appbar';

const Head = () => (
  <Header>
    <Appbar />
  </Header>
);

Header.propTypes = {
  viewer: React.PropTypes.object,
};

export default connect(state => ({
  viewer: state.users.viewer,
}))(Head);
