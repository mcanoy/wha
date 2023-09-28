import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard';
import GoogleHome from '@/components/GoogleHome';
import Cube from '@/components/Cube';

Vue.use(Router);

export default new Router({
  routes: [
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
  ],
});
