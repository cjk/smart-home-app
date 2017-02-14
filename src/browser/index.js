/* @flow */
/* eslint-disable react/require-extension */
// Bootstrap environment

const onWindowIntl = () => {
  require('babel-polyfill');

  // App locales are defined in src/server/config.js
  const { addLocaleData } = require('react-intl');
  const de = require('react-intl/locale-data/de');
  const en = require('react-intl/locale-data/en');

  [de, en].forEach(locale => addLocaleData(locale));

  require('./main');
};

// github.com/andyearnshaw/Intl.js/#intljs-and-browserifywebpack
if (!window.Intl && typeof require.ensure === 'function') {
  require.ensure([
    'intl',
    'intl/locale-data/jsonp/de.js',
    'intl/locale-data/jsonp/en.js',
  ], (require) => {
    require('intl');
    require('intl/locale-data/jsonp/de.js');
    require('intl/locale-data/jsonp/en.js');
    onWindowIntl();
  });
} else {
  onWindowIntl();
}
