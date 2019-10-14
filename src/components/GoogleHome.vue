<template>
  <div>
  <h2></h2>
  <div class="card">
      <div class="card-body">
    <form @submit.prevent="onTalk">
      <div class="form-group">
        <input v-model="say"  class="form-control" aria-describedby="emailHelp" placeholder="Google Say This">
      </div>
      <button type="submit" class="btn btn-primary btn-block">Say</button>
    </form>
</div>
  </div>
    <div class="card">
      <div class="card-header">
        Direct Hits
      </div>
      <div class="card-body">
        <button type="button" class="btn btn-lg btn-outline-primary btn-block"
          v-on:click="nextGame('leafs')">Leafs</button>
        <button type="button" class="btn btn-lg btn-outline-secondary btn-block"
          v-on:click="nextGame('raptor')">Raptors</button>
        <button type="button" class="btn btn-lg btn-outline-success btn-block"
          v-on:click="nextGame('birthday')">Birthday</button>
        <button type="button" class="btn btn-lg btn-outline-info btn-block"
          v-on:click="ronSwanson()">Ron Wisdom</button>
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
      say: '',
    };
  },
  methods: {
    googleTalk(phrase) {
      axios.get(`${process.env.API_URL}/google/talk?phrase=${phrase}`)
        .catch((error) => {
          console.error(error);
        });
    },
    onTalk() {
      this.googleTalk(this.say);
    },
    nextGame(game) {
      axios.get(`${process.env.API_URL}/next/${game}`)
        .catch((error) => {
          console.error(error);
        });
    },
    ronSwanson() {
      axios.get('https://ron-swanson-quotes.herokuapp.com/v2/quotes')
        .then((response) => {
          if (response.data.length === 1) {
            this.googleTalk(`Ron Swanson says ${response.data[0]}`);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
<style>
</style>
