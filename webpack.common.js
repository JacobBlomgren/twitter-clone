// airbnb's eslint doesn't yet make an exception for webpack files, other than those that start with
// webpack.config
/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';

import path from 'path';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import prefixer from 'autoprefixer';
import noComments from 'postcss-discard-comments';

export default {
  name: 'client',
  entry: {
    polyfills: ['babel-polyfill', 'whatwg-fetch'],
    vendor: [
      'ramda',
      'react',
      'react-dom',
      'react-redux',
      'redux',
      'react-router',
      'react-router-dom',
      'react-transition-group',
      'numeral',
      'moment',
    ],
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      // {
      //   test: /ComposeTweet\.jsx$/,
      //   loaders: ['bundle?lazy', 'babel'],
      // },
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      // { test: /plugin\.(scss)$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
      {
        test: /\.(scss)$/,
        use: ExtractTextPlugin.extract({
          use: [
            { loader: 'css-loader', options: { minimize: true } },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [prefixer(), noComments({ removeAll: true })],
              },
            },
            { loader: 'sass-loader' },
          ],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
