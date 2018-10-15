//引入vue
import Vue from 'vue'
//全局引入vueX
import Vuex from 'vuex';

import mutations from './mutations';
import * as actions from './actions';
import * as getters from './getters';

//全局注册vueX
Vue.use(Vuex);
//全局引用cookie方法类
import cookie from "@/assets/js/cookie"

const userInfo = {
  name:cookie.getCookie('name')||'',
  token:cookie.getCookie('token')||''
};

const articleType = {
  search: '',
  time: '',
  category: '',
  tag: '',
}

const contentOffset = 6

const state = {
  userInfo,
  articleType,
  contentOffset,
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});