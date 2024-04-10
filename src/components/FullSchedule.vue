<template>
  <div class="col d-lg-none">
    <h3>  {{ properDivision() }} Schedule</h3>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col" class="text-start d-lg-none">Date</th>
          <th scope="col">Home</th>
          <th scope="col" class="text-start d-lg-none">Sc</th>
          <th scope="col">Away</th>
          <th scope="col" class="text-start d-lg-none">Sc</th>
          <th scope="col" class="text-start d-lg-none">F</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="game in schedule" v-bind:key="game.team" :class="{ 'table-active': isSelectedTeam(game.home) || isSelectedTeam(game.away) }">
          <td class="text-start d-lg-none">{{ displayDateSmall(game.date, game.time) }}</td>
          <td :class="{ 'table-primary': isHomeWinner(game), 'table-info': isTied(game), 'table-danger': isHomeLoser(game)}">{{ shortTeamName(game.home) }}</td>
          <td :class="{ 'table-primary': isHomeWinner(game), 'table-info': isTied(game), 'table-danger': isHomeLoser(game) }">{{ game.homeScore }}</td>
          <td :class="{ 'table-primary': isAwayWinner(game), 'table-info': isTied(game), 'table-danger': isAwayLoser(game) }">{{ shortTeamName(game.away) }}</td>
          <td :class="{ 'table-primary': isAwayWinner(game), 'table-info': isTied(game), 'table-danger': isAwayLoser(game) }">{{ game.awayScore }}</td>
          <td>{{ shortField(game.location) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="col d-none d-lg-block">
  <h3>  {{ properDivision() }} Schedule</h3>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col" class="text-start ">Date</th>
          <th scope="col">Home</th>
          <th scope="col" class="text-start">Score</th>
          <th scope="col">Away</th>
          <th scope="col" class="text-start">Score</th>
          <th scope="col" class="text-star">Field</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="game in schedule" v-bind:key="game.team" :class="{ 'table-active': isSelectedTeam(game.home) || isSelectedTeam(game.away) }">
          <td class="text-start">{{ displayDate(game.date, game.time) }}</td>
          <td :class="{ 'table-primary': isHomeWinner(game), 'table-info': isTied(game), 'table-danger': isHomeLoser(game)}">{{ shortTeamName(game.home) }}</td>
          <td :class="{ 'table-primary': isHomeWinner(game), 'table-info': isTied(game), 'table-danger': isHomeLoser(game) }">{{ game.homeScore }}</td>
          <td :class="{ 'table-primary': isAwayWinner(game), 'table-info': isTied(game), 'table-danger': isAwayLoser(game) }">{{ shortTeamName(game.away) }}</td>
          <td :class="{ 'table-primary': isAwayWinner(game), 'table-info': isTied(game), 'table-danger': isAwayLoser(game) }">{{ game.awayScore }}</td>
          <td>{{ shortField(game.location) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import utils from '../utils'

export default {
  props: {
    schedule: Array,
    division: String,
    team: String, 
  },
  methods: {
    properDivision() {
      return utils.properDivision(this.division);
    },
    isHomeWinner(game) {
      return game.homeScore > game.awayScore;
    },
    isAwayWinner(game) {
      return game.homeScore < game.awayScore;
    },
    isHomeLoser(game) {
      return game.homeScore < game.awayScore;
    },
    isAwayLoser(game) {
      return game.homeScore > game.awayScore;
    },
    isTied(game) {
      return game.homeScore && game.homeScore == game.awayScore;
    },
    shortField(field) {
      return field.replace("Field ", '');
    },
    isSelectedTeam(team) {
      return team == this.team;
    },
    displayDate(day, thetime) {
      const gameDay = this.$dayjs().year() + `/${day.split(" ")[1]} ${thetime}`;
      return this.$dayjs(gameDay, "YYYY/M/D h:mm A").format("ddd MMM DD, h:mm a")
    },
    displayDateSmall(day, thetime) {
      const gameDay = this.$dayjs().year() + `/${day.split(" ")[1]} ${thetime}`;
      return this.$dayjs(gameDay, "YYYY/M/D h:mm A").format("M/D H:mm")
    },
    shortTeamName(team) {
      const regex = / \(.*\)/i;
      return team.replace(regex, '')
    },
  },
}
</script>