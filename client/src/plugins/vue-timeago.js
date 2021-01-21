import Vue from 'vue'
import VueTimeago from 'vue-timeago'
Vue.use(VueTimeago, {
  locale: 'en',
  locales: {
    'zh-CN': require('date-fns/locale/zh_cn')
  }
})