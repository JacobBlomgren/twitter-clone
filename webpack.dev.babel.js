// airbnb's eslint doesn't yet make an exception for webpack files, other than those that start with
// webpack.config
/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import merge from 'webpack-merge';

import ExtractTextPlugin from 'extract-text-webpack-plugin';

import common from './webpack.common';

import { WDS_PORT } from './src/shared/config';

export default merge(common, {
  entry: {
    main: ['react-hot-loader/patch', './src/client'],
  },
  output: {
    publicPath: `http://localhost:${WDS_PORT}/dist/`,
  },
  devServer: {
    port: WDS_PORT,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
      exclude: ['js/vendor.bundle.js', 'js/polyfills.bundle.js'],
    }),
    new ExtractTextPlugin({
      disable: true,
    }),
  ],
});
