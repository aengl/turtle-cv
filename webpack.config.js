const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: './cli.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'bin'),
    filename: 'turtle-cv.js',
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  plugins: [
    new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true }),
  ],
};
