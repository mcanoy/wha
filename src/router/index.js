import { createRouter, createWebHashHistory } from 'vue-router'
import Cube from '../components/Cube.vue'
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
  ]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
