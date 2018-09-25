import Vue from 'vue'
import Router from 'vue-router'
import Demo from '@/pages/demo/Demo'
import Layout from '@/pages/demo/components/Layout'
import Container from '@/pages/demo/components/Container'
import Home from '@/pages/home/Home'
import About from '@/pages/home/components/content/views/About'
import Archives from '@/pages/home/components/content/views/Archives'
import Article from '@/pages/home/components/content/views/Article'
import Cross from '@/pages/home/components/content/views/Cross'
import Message from '@/pages/home/components/content/views/Message'

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
        }
      ]
    },
    {
      path: '/demo',
      name: 'demo',
      component: Demo,
      children: [
        {
          path: '/layout',
          component: Layout
        },
        {
          path: '/container',
          component: Container
        }
      ]
    }
  ]
})