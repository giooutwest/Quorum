const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.web.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    publicPath: '/',
    clean: true,
  },
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
      'react-native-linear-gradient': path.resolve(__dirname, 'src/components/LinearGradient.web.tsx'),
      '@theme': path.resolve(__dirname, 'src/theme'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@screens': path.resolve(__dirname, 'src/screens'),
      '@data': path.resolve(__dirname, 'src/data'),
      '@app-types': path.resolve(__dirname, 'src/types'),
      '@navigation': path.resolve(__dirname, 'src/navigation'),
    },
    extensions: ['.web.tsx', '.web.ts', '.web.js', '.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules\/(?!(react-native-svg)\/).*/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@react-native/babel-preset'],
            plugins: [
              [
                'module-resolver',
                {
                  root: ['./'],
                  alias: {
                    '@theme': './src/theme',
                    '@components': './src/components',
                    '@screens': './src/screens',
                    '@data': './src/data',
                    '@app-types': './src/types',
                    '@navigation': './src/navigation',
                  },
                },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    port: 8080,
    hot: true,
    historyApiFallback: true,
  },
};
