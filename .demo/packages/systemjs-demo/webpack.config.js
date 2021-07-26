const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'main.js',
    libraryTarget: 'system', // 指定构建时所需要的库
  },
  devtool: 'source-map',
  // 服务器运行配置
  devServer: {
    port: 9000, // 端口
    contentBase: path.join(__dirname, 'build'),
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env', '@babel/react'] },
        },
      },
    ],
  },

  plugins: [
    // 插件
    new HtmlWebpackPlugin({
      /* 打包时，不需要自动引入JS文件(<script> 标签) */
      inject: false,
      /* 使用微前端的方式，我们需要自己加载对应的 JS 文件 */
      template: './src/index.html',
    }),
  ],

  // 添加打包排除选项，微前端中需要使用公共的 React ,打包是不需要的
  externals: ['react', 'react-dom', 'react-router-dom'],
};
