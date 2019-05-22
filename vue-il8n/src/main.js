// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'

Vue.config.productionTip = false
Vue.use(VueI18n)

// 多语言实例
const i18n = new VueI18n({
  locale: (function () {
    if (localStorage.getItem('lang')) {
      return localStorage.getItem('lang')
    }
    return 'zh-CN'
  }()),
  messages: {
    'zh-CN': require('./assets/i18n/zh'),
    'en-US': require('./assets/i18n/en')
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  components: { App },
  template: '<App/>'
})
