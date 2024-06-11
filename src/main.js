import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import dayjs from 'dayjs'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faSort);

const app = createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon);
app.config.globalProperties.$dayjs = dayjs;
app.mount('#app');
