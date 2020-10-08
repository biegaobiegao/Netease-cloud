import Vue from 'vue'
import VueRouter from 'vue-router'

// const Discover = () => import('@/pages/discover/index.vue')
// const My = () => import('@/pages/my/index.vue')
// const Friend = () => import('@/pages/friend/index.vue')
// const Mall = () => import('@/pages/mall/index.vue')
// const Musician = () => import('@/pages/musician/index.vue')
// const Ddownload = () => import('@/pages/download/index.vue')

import Discover from '@/pages/discover/index.vue'
import My from '@/pages/my/index.vue'
import Friend from '@/pages/friend/index.vue'
import Mall from '@/pages/mall/index.vue'
import Musician from '@/pages/musician/index.vue'
import Ddownload from '@/pages/download/index.vue'
import toplist from '@/pages/discover/toplist.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Discover,
    alias: '/discover',
    children: [{
      path: 'toplist',
      component: toplist
    }]
  },
  {
    path: '/friend',
    component: Friend
  },
  {
    path: '/mall',
    component: Mall
  },
  {
    path: '/musician',
    component: Musician
  },
  {
    path: '/my',
    component: My
  },
  {
    path: '/download',
    component: Ddownload
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
