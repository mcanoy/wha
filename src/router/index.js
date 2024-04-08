import { createRouter, createWebHashHistory } from 'vue-router'
import Cube from '../components/Cube.vue'
import Pll from '../components/Pll.vue'
import Baseball from '@/components/Baseball.vue'
import GoogleHome from '../components/GoogleHome.vue'

const routes = [
    {
      path: '/google-home',
      name: 'GoogleHome',
      component: GoogleHome,
    },
    {
      path: '/',
      name: 'Cube',
      component: Cube,
    },
    {
      path: '/pll',
      name: 'Pll',
      component: Pll,
    },
    {
      path: '/baseball/:division?/:team?',
      name: 'Baseball',
      component: Baseball,
      props: true
    },
  ]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
