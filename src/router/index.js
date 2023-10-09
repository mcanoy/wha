import { createRouter, createWebHashHistory } from 'vue-router'
import Cube from '../components/Cube.vue'
import Dashboard from '../components/Dashboard.vue'
import GoogleHome from '../components/GoogleHome.vue'

const routes = [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/google-home',
      name: 'GoogleHome',
      component: GoogleHome,
    },
    {
      path: '/cube',
      name: 'Cube',
      component: Cube,
    },
  ]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
