module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: ['last 1 versions'],
      compress: true,
    })
  ]
};
