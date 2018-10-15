/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Router from 'vue-router'

import Home from '../pages/home/Home'
import About from '../pages/content/components/About'
import Archives from '../pages/content/components/Archives'
import Article from '../pages/content/components/Article'
import Cross from '../pages/content/components/Cross'
import Message from '../pages/content/components/Message'
import ArticleContent from '../pages/content/components/ArticleContent'
import Registe from '../pages/content/components/Registe'
import Editor from '../pages/content/components/Editor'
import UserCenter from '../pages/content/components/UserCenter'
import UserInfo from '../pages/content/components/UserInfo'
import Index from '../pages/content/components/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect:'/index',
      children: [
        {path: '/index', component: Index, meta:{index:0}},
        {path: '/article', component: Article, meta:{index:1}},
        {path: '/message', component: Message, meta:{index:2}},
        {path: '/cross', component: Cross, meta:{index:3}},
        {path: '/archives', component: Archives, meta:{index:4}},
        {path: '/about', component: About, meta:{index:5}},
        {path: '/registe', component: Registe, meta:{index:6}},
        {path: '/content/:id', component: ArticleContent, meta:{index:7}},
        {path: '/editor/:id', component: Editor, meta:{index:8}},
        {path: '/userCenter', component: UserCenter, meta:{index:9}},
        {path: '/userInfo/:id', component: UserInfo, meta:{index:10}},
      ]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})