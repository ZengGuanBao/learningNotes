const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  resolve: {
    alias: {
      '@src': path.resolve('src')
    },
    extensions: [".js"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      title: "埋点"
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, "../src/static"), to: path.resolve(__dirname, "../dist/static") },
      ]
    })
  ]
};