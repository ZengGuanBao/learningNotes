const path = require("path")
const merge = require("webpack-merge")
const common = require("./webpack.common.js")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const webpack = require('webpack')

let option = {
  mode: "production",
  output: {
    filename: "hzed.microspot.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "./"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({ 'process.env.RUN_ENV': JSON.stringify(process.env.RUN_ENV) })
  ],
}

module.exports = merge(common, option)