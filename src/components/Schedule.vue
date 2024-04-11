<template>
  <div class="col">
    <h3>{{ properDivision() }} {{ shortTeamName(team) }} Schedule</h3>
    <div class="panel-body table-responsive">
    <table class="table table-hover table-bordered border-dark table-sm">
      <thead class="table-success">
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Opponent</th>
          <th scope="col">Score</th>
          <th scope="col">Field</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="game in getSingleTeamSchedule()" v-bind:key="game.team">
          <td class="text-start">{{ displayDate(game.date, game.time) }}</td>
          <td class="text-start">{{ versus(game) }} </td>
          <td :class="{ 'table-primary': getTeamResult(game) == 'W', 'table-info': getTeamResult(game) == 'T', 'table-danger': getTeamResult(game) == 'L' }"> {{  getTeamResult(game) }} {{ getGameScore(game) }}</td>
          <td>{{ shortField(game.location) }}</td>
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
    schedule: Array,
    division: String,
    team: String,
    maxHeight: String,
  },
  methods: {
    getSingleTeamSchedule() {
      return this.schedule ? this.schedule.filter((game) => game.home == this.team || game.away == this.team) : [];
    },
    properDivision() {
      return utils.properDivision(this.division);
    },
    displayDate(day, thetime) {
      const gameDay = this.$dayjs().year() + `/${day.split(" ")[1]} ${thetime}`;
      return this.$dayjs(gameDay, "YYYY/M/D h:mm A").format("ddd MMM DD, h:mm a")
    },
    getGameScore(game) {
      
      if(!game.homeScore) {
        return '';
      }

      const homeScore = Number(game.homeScore);
      const awayScore = Number(game.awayScore);

      if(homeScore > awayScore) {
        return `${homeScore} - ${awayScore}`
      }

      return `${awayScore} - ${homeScore}`
    },
    getTeamResult(game) {
      
      if(!game.homeScore) {
        if(utils.getDate(game).isBefore(this.$dayjs())) {
          return 'PPD';
        }

        return '--';
      }

      const homeScore = Number(game.homeScore);
      const awayScore = Number(game.awayScore);

      if(homeScore == awayScore) {
        return 'T';
      }

      const isHome = this.team == game.home;
      if ((isHome && homeScore > awayScore) ||  (!isHome && homeScore < awayScore)) {
        return 'W';
      }
      return 'L';
    },
    shortField(field) {
      return field.replace("Field ", '');
    },
    shortTeamName(team) {
      return utils.shortTeamName(team)
    },
    versus(game) {
      return game.home == this.team ? `vs ${utils.shortTeamName(game.away)}` : `@ ${utils.shortTeamName(game.home)}`;
    }
  }
}
</script>
<style scoped>
.table-responsive {
    max-height:v-bind(maxHeight);
}
</style>
