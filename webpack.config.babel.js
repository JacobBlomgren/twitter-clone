import webpack from 'webpack';

import path from 'path';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin';

import { WDS_PORT, APP_NAME } from './src/shared/config';
import { isProd } from './src/shared/utils/isProd';

export default {
  entry: {
    polyfills: ['babel-polyfill'],
    main: ['react-hot-loader/patch', './src/client'],
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: isProd ? '/static/' : `http://localhost:${WDS_PORT}/dist/`,
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
  devtool: isProd ? false : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    port: WDS_PORT,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),
    new ExtractTextPlugin({
      filename: 'styles/main-[contenthash].css',
      disable: !isProd,
    }),
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      inject: false,
      title: APP_NAME,
      template: 'index.ejs',
    }),
    new HtmlWebpackHarddiskPlugin(),
  ],
};
