const path = require("path");
const resolve = dir => path.join(__dirname, dir);

module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set("@static", resolve("src/assets/static"))
      .set("@js", resolve("src/assets/js"))
      .set("@images", resolve("src/assets/images"))
      .set("@components", resolve("src/components"))
      .set("@views", resolve("src/views"))
      .set("@router", resolve("src/router"))
      .set("@store", resolve("src/store"))
    config.resolve.symlinks(true)
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'font-size-sm': '13px',
          'font-size-md': '15px',
          'font-size-lg': '17px',
          'goods-action-button-danger-color': '#7232dd',
          'goods-action-button-warning-color': '#3eaf7c'
        }
      }
    }
  },
  devServer: { // 设置代理
    hot: true, //热加载
    host: '0.0.0.0', //ip地址
    port: 8085, //端口
    // https: false, //false关闭https，true为开启
    open: true, //自动打开浏览器
    proxy: {
      '/api': { //本地 
        target: 'xxx', // 目标代理接口地址
        secure: false,
        // ws: true, // 是否启用websockets
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
}
