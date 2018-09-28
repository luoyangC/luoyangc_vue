import Vue from 'vue'
import App from './App.vue'

// 全局UI组件
import ElementUI from 'element-ui'

// 全局路由
import router from './router'
import hljs from 'highlight.js'

//全局状态控制引入
import store from './store/store';

//全局加载resource拦截器
import './axios/';
import Axios from 'axios';
Vue.prototype.$http = Axios

import 'highlight.js/styles/googlecode.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'

import './assets/styles/iconfont/iconfont.css'

Vue.config.productionTip = false

Vue.directive('highlight', (el) => {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
