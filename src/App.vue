<template>
  <nav class="navbar navbar-dark bg-primary" >
    <router-link to="/" class="navbar-brand" style="margin-left: 10px">Oll</router-link>
    <router-link to="/pll" class="navbar-brand" style="margin-left: 10px">Pll</router-link>
    <router-link to="/google-home" class="navbar-brand">Talk</router-link>
    <router-link to="/baseball" class="navbar-brand">Baseball</router-link>
    <router-link to="/stats/team" class="navbar-brand">Stats</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 10px;
}

.router-link-exact-active{
  font-weight: bold;
}

</style>
