// airbnb's eslint doesn't yet make an exception for webpack files, other than those that start with
// webpack.config
/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import merge from 'webpack-merge';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin';

import common from './webpack.common';

import { WDS_PORT, APP_NAME } from './src/shared/config';

export default merge(common, {
  entry: {
    main: ['react-hot-loader/patch', './src/client'],
  },
  output: {
    publicPath: `http://localhost:${WDS_PORT}/dist/`,
  },
  devtool: 'source-map',
  devServer: {
    port: WDS_PORT,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      // ?
      filename: 'styles/main-[contenthash].css',
      disable: true,
    }),
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      inject: false,
      minify: false,
      title: APP_NAME,
      template: 'index.ejs',
    }),
    new HtmlWebpackHarddiskPlugin(),
  ],
});
