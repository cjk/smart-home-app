// @flow
import type { State } from '../../common/types';
import React from 'react';
import * as themes from '../../browser/themes';
import ThemeProvider from '../components/ThemeProvider';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';

const common = () => (WrappedComponent: Function) => {
  const Common = (
    {
      intl: { defaultLocale, initialNow, currentLocale, messages },
      currentTheme,
      ...props
    }: any
  ) => (
    <ThemeProvider
      key={currentTheme} // github.com/yahoo/react-intl/issues/234#issuecomment-163366518
      theme={themes[currentTheme] || themes.initial}
    >
      <IntlProvider
        defaultLocale={defaultLocale}
        initialNow={initialNow}
        key={currentLocale} // github.com/yahoo/react-intl/issues/234#issuecomment-163366518
        locale={currentLocale}
        messages={messages[currentLocale]}
      >
        <WrappedComponent {...props} />
      </IntlProvider>
    </ThemeProvider>
  );
  return connect((state: State) => ({
    intl: state.intl,
    currentTheme: state.themes.currentTheme,
  }))(Common);
};

export default common;
