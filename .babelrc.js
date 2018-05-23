const env = require('./env-config')

module.exports = {
  presets: ['next/babel', '@babel/preset-flow'],
  plugins: [
    '@babel/transform-flow-strip-types',
    ['transform-define', env],
  ],
}
