<template>
  <div>
    <h2></h2>
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="onTalk">
          <div class="form-group mb-3">
            <input v-model="say"  class="form-control" aria-describedby="emailHelp" placeholder="Google Say This">
          </div>
          <button type="submit" class="btn btn-primary btn-block w-100">Say</button>
        </form>
      </div>
    </div>
    <p></p>
    <div class="card">
      <div class="card-header">
        Direct Hits
      </div>
      <div class="card-body">
        <button type="button" class="btn btn-lg btn-outline-primary btn-block w-25"
          v-on:click="nextGame('leafs')">Leafs</button>
        <button type="button" class="btn btn-lg btn-outline-secondary btn-block w-25"
          v-on:click="nextGame('raptor')">Raptors</button>
        <button type="button" class="btn btn-lg btn-outline-success btn-block w-25"
          v-on:click="nextGame('birthday')">Birthday</button>
        <button type="button" class="btn btn-lg btn-outline-info btn-block w-25"
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
      axios.get(`${process.env.VUE_APP_API_URL}/api/google/talk?text=${phrase}`)
        .catch((error) => {
          console.error(error);
        });
    },
    onTalk() {
      this.googleTalk(this.say);
    },
    nextGame(game) {
      const url = game == 'birthday' ? 'api/birthday/next' : `api/nhl/next/${game}`;

      axios.get(`${process.env.VUE_APP_API_URL}/${url}`)
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
