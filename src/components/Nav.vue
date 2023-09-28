<template>
  <div>
    <nav class="navbar navbar-dark bg-primary">
      <router-link v-for="routes in links" class="navbar-brand"
      v-bind:key="routes.id"
      :to="`${routes.page}`">{{routes.text}}</router-link>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'Navigation',
  data() {
    return {
      links: [
        {
          id: 0,
          text: 'Speakers',
          page: '/',
        },
        {
          id: 1,
          text: 'Talk',
          page: '/google-home',
        },
        {
          id: 2,
          text: 'Cube',
          page: '/cube',
        },
      ],
    };
  },
};
</script>
<style>
.router-link-exact-active{
  font-weight: bold;
}
</style>
