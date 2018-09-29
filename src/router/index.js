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
      children: [
        {
          path: '/article',
          component: Article
        },
        {
          path: '/cross',
          component: Cross
        },
        {
          path: '/archives',
          component: Archives
        },
        {
          path: '/message',
          component: Message
        },
        {
          path: '/about',
          component: About
        },
        {
          path: '/registe',
          component: Registe
        },
        {
          path: '/content/:id',
          component: ArticleContent
        },
        {
          path: '/editor',
          component: Editor
        }
      ]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})