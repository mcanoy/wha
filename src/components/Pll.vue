<template>
  <div class="container">
    <h1>{{ mastered }} / {{ cubes.length }} Mastered</h1>
    <div class="row">
      <div v-for="cube in cubes" :key="cube.name" 
        class="card mb-2" :class="{'bg-info': cube.isMastered, 'text-white':cube.isMastered}" style="width:185px">
        <img class="card-img-top"  v-bind:src="cube.img" :alt="cube.name"/>
        <h4 class="card-title">{{ cube.group }}</h4>
        <p class="card-text">{{ cube.algorithm }}</p>
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
        cubes: [
          {
            "name": 21,
            "img": "data:image/png;base64,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",
            "algorithm": "R U2 R' U' R U R' U' R U' R'",
            "group": "Cross",
            "isMastered": "true",
          },
        ],
        mastered: 0,
      };
    },
    mounted() {
      this.getCubes();
    },
    methods: {
      getCubes() {
        const self = this;
        const url = `${process.env.VUE_APP_CUBE_PLL_JSON}/pll.json`;
        axios.get(url)
          .then((response) => {
            console.warn(response.data);
            console.warn(response.data.cubes);
            self.cubes = response.data.cubes;
            self.mastered = self.cubes.filter(function (el) {
             return el.isMastered
            }).length
          })
          .catch((error) => {
            console.error(error);
          });
      },
    },
  };
  
  </script>
  