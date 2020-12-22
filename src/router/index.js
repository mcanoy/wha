import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard';
import GoogleHome from '@/components/GoogleHome';

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
  ],
});
