import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faVolumeUp, faVolumeDown, faVolumeOff, faStepForward, faStepBackward, faPowerOff, faVolumeMute, faMicrophone, faMicrophoneSlash, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faVolumeUp);
library.add(faVolumeDown);
library.add(faVolumeMute);
library.add(faVolumeOff);
library.add(faStepForward);
library.add(faStepBackward);
library.add(faPowerOff);
library.add(faMicrophone);
library.add(faMicrophoneSlash);
library.add(faPlayCircle);

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
