const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

const deps = require('./package.json').dependencies;

module.exports = {
  entry: './src/main',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 4001,
  },
  target: 'web',
  output: {
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app1', // 其他项目引用时的名字
      filename: 'remoteEntry.js', //暴露的模块统一打包在这个名字，可以任意取
      remotes: {
        app2: 'app2@http://localhost:4002/remoteEntry.js',
      },
      exposes: {
        './Button': './src/Button', // 暴露的组件
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
