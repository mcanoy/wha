<template>
    <div class="card-deck mb-3 text-center">
      <div class="card mb-4 shadow-sm" v-for="zone in zones" :key="zone.zone">
        <div class="card-header">
          <h4 class="my-0 font-weight-normal">{{ getZoneName(zone.zone) }}</h4>
        </div>
        <div class="card-body">
          <h1 class="card-title pricing-card-title">
            <font-awesome-icon v-if="zone.mu === '00'" icon="microphone"/>
            <font-awesome-icon color="gray" v-if="zone.mu === '01'" icon="microphone-slash"/>
          {{ zone.vo }}</h1>
          <h3><font-awesome-icon icon="play-circle"/> {{ zone.ch }}</h3>

          <h3><button class="btn btn-lg btn-outline-primary"
            v-on:click="updateWHAToggle(zone.zone, zone.mu, 'mu')">
          <font-awesome-icon  v-if="zone.mu === '00'" icon="volume-mute" />
          <font-awesome-icon  v-if="zone.mu === '01'" icon="volume-off" /></button>
          <button class="btn btn-lg btn-outline-primary"
            v-on:click="updateWHAIncrement(zone.zone, zone.vo, 'vo', -1)">
          <font-awesome-icon icon="volume-down"/></button>
          <button class="btn btn-lg btn-outline-primary"
            v-on:click="updateWHAIncrement(zone.zone, zone.vo, 'vo', 1)">
          <font-awesome-icon icon="volume-up"/></button>
          </h3>
          <h3><button class="btn btn-lg btn-outline-primary"
            v-on:click="updateWHAIncrement(zone.zone, zone.ch, 'ch', -1)">
          <font-awesome-icon icon="step-backward"/></button>
          <button class="btn btn-lg btn-outline-primary"
            v-on:click="updateWHAIncrement(zone.zone, zone.ch, 'ch', 1)">
          <font-awesome-icon icon="step-forward"/></button>
          </h3>
          <h3><button class="btn btn-lg btn-block btn-primary"
           v-on:click="updateWHAToggle(zone.zone, zone.pr, 'pr')">
          <font-awesome-icon v-if="zone.pr === '00'" color="gray" icon="power-off"/>
          <font-awesome-icon v-if="zone.pr === '01'" icon="power-off"/></button></h3>
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
      axios.get(`${process.env.API_URL}/zones`)
        .then((response) => {
          console.warn(response.data);
          self.zones = response.data;
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
      axios.post(`${process.env.API_URL}/zones/${zone}/${setting}`, payload)
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
