// airbnb's eslint doesn't yet make an exception for webpack files, other than those that start with
// webpack.config
/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';

import path from 'path';

import ExtractTextPlugin from 'extract-text-webpack-plugin';

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
      'history',
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
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.(scss)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                /* eslint-disable */
                plugins: function() {
                  /*
                    Disable removal of outdated prefixes (not needed),
                    which speeds up Autoprefixer.
                    https://github.com/postcss/autoprefixer#outdated-prefixes
                   */
                  return [require('autoprefixer')({ remove: false })];
                },
                /* eslint-enable */
              },
            },
            {
              loader: 'sass-loader',
            },
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
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),
  ],
};
