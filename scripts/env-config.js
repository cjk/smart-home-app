// @flow
const { execSync } = require('child_process');
const { name: appName } = require('../package.json');

// github.com/FormidableLabs/babel-plugin-transform-define
// Note this file is cached in node-modules dir.

const appVersion = process.env.APP_VERSION || 'dev';
const production = process.env.NODE_ENV === 'production';

module.exports = {
  APP_NAME: appName,
  APP_VERSION: appVersion,
};
