const merge = require("webpack-merge")
const common = require("./webpack.common.js")
const webpack = require("webpack")
const path = require("path")

const option = {
  mode: "development",
  output: {
    filename: "hzed.microspot.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "./"
  },
  devtool: "inline-source-map",
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({ 'process.env.RUN_ENV': JSON.stringify(process.env.RUN_ENV) })

  ]
}

module.exports = merge(common, option)
