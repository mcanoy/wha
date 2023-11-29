<template>
  <p></p>
  <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
    <div class="col" v-for="zone in zones" :key="zone.zone">
      <div class="card mb-4 rounded-3 shadow-sm border-secondary">
        <div class="card-header py-3 text-bg-secondary border-secondary">
          <h4 class="my-0 font-weight-normal">{{ getZoneName(zone.zone) }}</h4>
        </div>
        <div class="card-body">
          <h1 class="card-title pricing-card-title">
            <font-awesome-icon v-if="zone.mu === '00'" icon="microphone"/>
            <font-awesome-icon color="gray" v-if="zone.mu === '01'" icon="microphone-slash"/>
            {{ zone.vo }}
            <small><font-awesome-icon icon="play-circle"/> {{ zone.ch }}</small>
          </h1>
          
          <h3>
            <button class="btn btn-lg btn-outline-primary w-50" v-on:click="updateWHAToggle(zone.zone, zone.mu, 'mu')">
              <font-awesome-icon  v-if="zone.mu === '00'" icon="volume-mute" />
              <font-awesome-icon  v-if="zone.mu === '01'" icon="volume-off" />
            </button>
            <button class="btn btn-lg btn-outline-primary w-25" v-on:click="updateWHAIncrement(zone.zone, zone.vo, 'vo', -1)">
              <font-awesome-icon icon="volume-down"/>
            </button>
            <button class="btn btn-lg btn-outline-primary w-25" v-on:click="updateWHAIncrement(zone.zone, zone.vo, 'vo', 1)">
              <font-awesome-icon icon="volume-up"/>
            </button>
          </h3>
          <h3>
            <button class="btn btn-lg btn-outline-primary w-50" v-on:click="updateWHAIncrement(zone.zone, zone.ch, 'ch', -1)">
              <font-awesome-icon icon="step-backward"/>
            </button>
            <button class="btn btn-lg btn-outline-primary w-50" v-on:click="updateWHAIncrement(zone.zone, zone.ch, 'ch', 1)">
              <font-awesome-icon icon="step-forward"/>
            </button>
          </h3>
            <button class="btn btn-lg btn-block btn-primary w-100" v-on:click="updateWHAToggle(zone.zone, zone.pr, 'pr')">
              <font-awesome-icon v-if="zone.pr === '00'" color="gray" icon="power-off"/>
              <font-awesome-icon v-if="zone.pr === '01'" icon="power-off"/>
            </button>
          
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

import axios from 'axios';

export default {
  data() {
    return {
      zones: [{ zone: '11-living' }, { zone: '12-office' }],
      zoneNames: [{ zone: 11, name: 'Living Room' }, { zone: 12, name: 'Office' }],
      zoneNameMap: new Map([['11', 'Den'], ['12', 'Office'], ['13', 'Living'], ['14', 'Dining'], ['15', 'Bed'], ['16', 'Bath']]),
    };
  },
  mounted() {
    this.getZones();
  },
  methods: {
    getZones() {
      const self = this;
      axios.get(`${process.env.VUE_APP_API_URL}/zones`)
        .then((response) => {
          console.warn(response.data);
          self.zones = response.data.filter(n => n);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getZoneName(id) {
      return (this.zoneNameMap.get(id) || id);
    },
    updateWHAToggle(zone, currentState, setting) {
      const newState = currentState === '00' ? '01' : '00';
      this.updateWHA(zone, setting, newState);
    },
    updateWHAIncrement(zone, currentVolume, setting, adjustment) {
      const newVolume = (Number(currentVolume) + adjustment).toString().padStart(2, '0');
      this.updateWHA(zone, setting, newVolume);
    },
    updateWHA(zone, setting, payload) {
      console.warn(`zone ${zone}, setting ${setting}, payload ${payload}`)
      axios.post(`${process.env.VUE_APP_API_URL}/zones/${zone}/${setting}`, payload)
        .then(() => {
          this.getZones();
        });
    },
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html {
  font-size: 14px;
}
@media (min-width: 768px) {
  html {
    font-size: 16px;
  }
}

.container {
  max-width: 960px;
}

.pricing-header {
  max-width: 700px;
}

.card-deck .card {
  min-width: 220px;
}

.margin-bottom {
  .margin-top: 10px;
}
</style>
