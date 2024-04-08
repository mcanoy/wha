<template>
  <div class="col m-2">
    <h3>{{ properDivision() }} Standings</h3>
    <div class="panel-body table-responsive">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Place</th>
          <th scope="col">Team</th>
          <th scope="col">W</th>
          <th scope="col">L</th>
          <th scope="col">T</th>
          <th scope="col">Pct</th>
          <th scope="col">RF</th>
          <th scope="col">RA</th>
          <th scope="col">Streak</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="team in standings" :key="team.team" :class="{ 'table-active': team.team == selectTeam  }">
          <th scope="row">{{ team.place }}</th>
          <td><RouterLink :to="`/baseball/${division}/${team.team}`">{{ team.team }}</RouterLink></td>
          <td>{{ team.wins }}</td>
          <td>{{ team.losses }}</td>
          <td>{{ team.ties }}</td>
          <td>{{ team.pct }}</td>
          <td>{{ team.runs_for }}</td>
          <td>{{ team.runs_against }}</td>
          <td>{{ team.streak }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>
<script>
import utils from '../utils'

export default {
  props: {
    standings: Array,
    division: String,
    selectTeam: String,
  },
  methods: {
    properDivision() {
      return utils.properDivision(this.division);
    },
  }
}
</script>
<style scoped>
.table-responsive {
    max-height:600px;
}
</style>