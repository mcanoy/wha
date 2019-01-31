// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { library } from '@fortawesome/fontawesome-svg-core';
import { faVolumeUp, faVolumeDown, faVolumeOff, faStepForward, faStepBackward, faPowerOff, faVolumeMute, faMicrophone, faMicrophoneSlash, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Vue from 'vue';
import App from './App';
import router from './router';

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

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
