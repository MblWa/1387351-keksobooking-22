const path = require('path');

module.exports = {
  entry: './source/js/index.js',
  devtool: 'source-map',
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(__dirname, 'build/js'),
  },
};
