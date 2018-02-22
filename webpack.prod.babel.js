// airbnb's eslint doesn't yet make an exception for webpack files, other than those that start with
// webpack.config
/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import merge from 'webpack-merge';
import path from 'path';

import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import InlineManifestWebpackPlugin from 'inline-manifest-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import common from './webpack.common';

const clientConfig = merge(common, {
  entry: {
    main: './src/client',
  },
  output: {
    filename: 'js/[name].[chunkhash].js',
    publicPath: '/static/',
  },
  plugins: [
    // equivalent to the -p flag, but we only want it for the client config, and not the server config.
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.HashedModuleIdsPlugin(),
    new ExtractTextPlugin({
      filename: 'styles/[name]-[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      minify: {
        collapseWhitespace: true,
        minifyJS: true,
        removeComments: true,
      },
      template: 'index.ejs',
    }),
    new InlineManifestWebpackPlugin({
      name: 'webpackManifest',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: path.join(__dirname, 'report.html'),
    }),
  ],
});

const serverConfig = {
  name: 'server',
  target: 'node',
  externals: [nodeExternals()],
  entry: ['./src/server/rendering/serverEntry.jsx'],
  output: {
    path: path.join(__dirname, 'lib/server/rendering/'),
    filename: 'renderApp.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
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
};

export default [clientConfig, serverConfig];
