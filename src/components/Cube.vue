<template>
<div class="container">
  <div class="row">
    <div v-for="cube in cubes" :key="cube.name" 
      class="card mb-2" :class="{'bg-info': cube.isMastered, 'text-white':cube.isMastered}" style="width:155px">
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
          name: 29,
          img: '',
          algorithm: "'R U R' U' R U' R' F' U' F R U R'",
          group: 'Awkward',
          isMastered: true,
        },
      ],
    };
  },
  mounted() {
    this.getCubes();
  },
  methods: {
    getCubes() {
      const self = this;
      const url = `${process.env.VUE_APP_CUBE_JSON}/oll.json`;
      axios.get(url)
        .then((response) => {
          self.cubes = response.data.cubes;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};

</script>
