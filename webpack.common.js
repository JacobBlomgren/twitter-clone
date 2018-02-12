// airbnb's eslint doesn't yet make an exception for webpack files, other than those that start with
// webpack.config
/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';

import path from 'path';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import prefixer from 'autoprefixer';
import noComments from 'postcss-discard-comments';
import babelRamda from 'babel-plugin-ramda'

export default {
  name: 'client',
  entry: {
    polyfills: ['babel-polyfill', 'whatwg-fetch'],
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: { plugins: [babelRamda] },
        },
        exclude: /node_modules/,
      },
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
    // split vendor files into separate bundle
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      // technique suggested here https://webpack.js.org/plugins/commons-chunk-plugin/
      minChunks: module =>
        module.context &&
        module.context.indexOf('node_modules') !== -1 &&
        // Do not include polyfills which are in their separate bundle,
        // and react-icons which is bound to change too frequently
        // TODO this should probably use an array of packages that change
        // too frequently in the future.
        !/(core-js|whatwg-fetch|react-icons)/.test(module.context),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // Omit the very heavy locales of moment, as the app is not international yet.
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
};
