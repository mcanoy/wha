import { createRouter, createWebHashHistory } from 'vue-router'
import Cube from '@/components/Cube.vue'
import Pll from '@/components/Pll.vue'
import Baseball from '@/components/Baseball.vue'
import Stats from '@/components/Stats.vue'
import GoogleHome from '@/components/GoogleHome.vue'

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
    {
      path: '/stats/team/:season?/:division?',
      name: 'Stats',
      component: Stats,
      props: true,
      alias: ['/stats/player/:player?', '/stats/game/:gamedate?/division/:division?', '/stats/games/:gamedate?/division/:division?'],

    },
  ]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
