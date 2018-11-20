<template>
  <div class="container">
    <div class="row">
      <div class="col-sm" v-for="zone in zones" :key="zone.zone">
        {{ getZoneName(zone.zone) }}, Volume {{ zone.vo }}, Source {{ zone.ch }}
        <button v-on:click="updateWHAToggle(zone.zone, zone.mu, 'mu')">
          <font-awesome-icon icon="volume-mute"/></button>
        <button v-on:click="updateWHAIncrement(zone.zone, zone.vo, 'vo', -1)">
          <font-awesome-icon icon="volume-down"/></button>
        <button v-on:click="updateWHAIncrement(zone.zone, zone.vo, 'vo', 1)">
          <font-awesome-icon icon="volume-up"/></button>
        <button v-on:click="updateWHAIncrement(zone.zone, zone.ch, 'ch', -1)">
          <font-awesome-icon icon="step-backward"/></button>
        <button v-on:click="updateWHAIncrement(zone.zone, zone.ch, 'ch', 1)">
          <font-awesome-icon icon="step-forward"/></button>
        <button v-on:click="updateWHAToggle(zone.zone, zone.pr, 'pr')">
          <font-awesome-icon icon="power-off"/></button>
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
      zoneNameMap: new Map([['11', 'Living Room'], ['12', 'Office']]),
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

<style>


h3 {
  margin-top: 2rem;
}

.row {
  margin-bottom: 1rem;
}
.row .row {
  margin-top: 1rem;
  margin-bottom: 0;
}
[class*="col-"] {
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: rgba(86, 61, 124, .15);
  border: 1px solid rgba(86, 61, 124, .2);
}

hr {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

</style>
