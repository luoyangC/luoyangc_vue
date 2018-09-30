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

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect:'/article',
      children: [
        {path: '/article', component: Article, meta:{index:0}},
        {path: '/cross', component: Cross, meta:{index:2}},
        {path: '/archives', component: Archives, meta:{index:3}},
        {path: '/message', component: Message, meta:{index:1}},
        {path: '/about', component: About, meta:{index:4}},
        {path: '/registe', component: Registe, meta:{index:5}},
        {path: '/content/:id', component: ArticleContent, meta:{index:6}},
        {path: '/editor', component: Editor, meta:{index:7}},
      ]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})