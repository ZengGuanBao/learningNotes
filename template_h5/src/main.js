import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import Utils from './assets/js/Utils'
import './assets/js/Vant'
import './assets/js/Monitor'

Vue.prototype.$Utils = Utils
Vue.prototype.$bus = new Vue({})
FastClick.attach(document.body)
FastClick.prototype.focus = function (targetElement) {
  var length
  // 兼容处理:在iOS7中，有一些元素（如date、datetime、month等）在setSelectionRange会出现TypeError
  // 这是因为这些元素并没有selectionStart和selectionEnd的整型数字属性，所以一旦引用就会报错，因此排除这些属性才使用setSelectionRange方法
  if (Utils.deviceIsIOS() && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month' && targetElement.type !== 'email') {
    length = targetElement.value.length
    targetElement.setSelectionRange(length, length)
    /* 修复bug ios 11.3不弹出键盘，这里加上聚焦代码，让其强制聚焦弹出键盘 */
    targetElement.focus()
  } else {
    targetElement.focus()
  }
}
// , from, next
router.afterEach((to) => {
  Vue.nextTick(() => {
    // 从路由的元信息中获取 title 属性
    // console.log('to.meta-->', to.fullPath)
    if (to.fullPath) {
      // 设置页面标题的国际化
      document.title = i18n.t(to.meta.title)
      sessionStorage.setItem('pageEventCurrentTitle', to.meta.title)  // 当前页面标题
      sessionStorage.setItem('pageEventCurrentUrl', location.href) // 当前 URL 地址
      setTimeout(() => {
        // sessionStorage.setItem('pageEventCurrentTitle', to.meta.title)  // 当前页面标题
        // sessionStorage.setItem('pageEventCurrentUrl', location.href) // 当前 URL 地址
        // Object.prototype.hasOwnProperty.call(window, "pageReport_HZ")-window.hasOwnProperty('pageReport_HZ')
        if (Object.prototype.hasOwnProperty.call(window, "pageReport_HZ")) {
          window.pageReport_HZ()
          // console.log('sessionStorage', sessionStorage.getItem('pageEventCurrentTitle'))
        }
      }, 100)
    }
  })
  if (to.meta.title) {
    // 如果是 iOS 设备，则使用如下 hack 的写法实现页面标题的更新
    if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
      const hackIframe = document.createElement('iframe')
      hackIframe.style.display = 'none'
      hackIframe.src = './assets/static/fixIosTitle.html?r=' + Math.random()
      document.body.appendChild(hackIframe)
      setTimeout(() => {
        document.body.removeChild(hackIframe)
      }, 300)
    }
  }
})
Vue.config.productionTip = false
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
