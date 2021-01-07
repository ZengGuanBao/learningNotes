const webpackDevServer = require("webpack-dev-server")
const webpack = require("webpack")
const merge = require("webpack-merge")
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const webpackDev = require("./webpack.dev.js")
const path = require("path")
let port = 3030

const devoption = {
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://localhost:${port}`],
      },
      clearConsole: true,
    })
  ]
}

let config = merge(devoption, webpackDev)


const options = {
  hot: true,
  contentBase: path.join(__dirname, '../dist'),
  host: '0.0.0.0', // 允许通过其他ip访问
  port: port, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
  proxy: {
    '/hzed-pub-microspot': {
      // target: 'http://10.10.60.155:6736',
      target: 'http://10.10.20.174:9321',
      changeOrigin: true,
      // toProxy: false,
      // prependPath: false,
      secure: false, // 接受 运行在 https 上的服务
    }
  },
  clientLogLevel: 'silent',
  quiet: true,
  overlay: {
    warnings: true,
    errors: true
  }
}

webpackDevServer.addDevServerEntrypoints(config, options)
const compiler = webpack(config)
const server = new webpackDevServer(compiler, options)

server.listen(port, "localhost", () => {
  console.log(`dev server listening on port ${port}`)
})
