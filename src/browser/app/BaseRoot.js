// @flow
import React from 'react';
import { Provider as Redux } from 'react-redux';

type BaseRootProps = {
  children?: any,
  store: Object,
};

// This is reused in src/server/frontend/render.js
const BaseRoot = ({
  store,
  children,
}: BaseRootProps) => (
  <Redux store={store}>
    {children}
  </Redux>
);

export default BaseRoot;
