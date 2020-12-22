<template>
  <div id="app">
    <div class="container">
      <Nav></Nav>
      <h2></h2>
      <router-view/>
    </div>
  </div>
</template>

<script>
// eslint object-shorthand: [2, "never"]

import Nav from './components/Nav';

export default {
  name: 'App',
  components: {
    Nav,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

</style>
