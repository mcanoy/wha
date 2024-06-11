<template>
  <div class="container-fluid">
    <div class="col m-2">
      <h3> {{ season }} {{ division }} <span v-if="this.$parent.type == 'game'">{{ totalHitting.gamedate }}</span> </h3>
      <div class="">
        <table class="table table-hover table-sm table-striped">
          <thead class="table-success">
            <tr>
              <th v-for="column in getColumns()" :colspan="column.span" scope="col" :key="column.name">
                {{  column.display }}
                <a :href="this.$route.query.page" v-on:click="sortBy(column.name, season, division)" :class="{active: sorter == column.name}"><font-awesome-icon icon="sort" style="color: green" size="xs"/></a>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="stat in hitting" :key="stat.id">
              <th scope="row"><RouterLink :to="`/stats/team/`">{{ stat.season }}</RouterLink></th>
              <td><RouterLink :to="`/stats/games/${stat.season}/division/${stat.division}`">{{ stat.division }}</RouterLink></td>
              <td v-if="showColumn('player')"><RouterLink :to="`/stats/player/${stat.player}`">{{  stat.player }}</RouterLink></td>
              <td v-if="showColumn('gameDate')"><RouterLink :to="`/stats/game/${stat.gamedate}/division/${stat.division}`">{{  stat.gamedate }}</RouterLink></td>
              <td v-if="showColumn('opponent')">{{  stat.opponent }}</td>
              <td v-if="showColumn('result')">{{ formatResult(stat) }}</td>
              <td v-if="showColumn('result')">{{ stat.score }}</td>
              <td v-if="showColumn('games')">{{ stat.games }}</td>
              <td>{{ stat.plate_appearances }}</td>
              <td>{{ stat.at_bats }}</td>
              <td>{{ stat.runs }}</td>
              <td>{{ stat.hits }}</td>
              <td>{{ stat.doubles }}</td>
              <td>{{ stat.triples }}</td>
              <td>{{ stat.home_runs }}</td>
              <td>{{ stat.walks }}</td>
              <td>{{ stat.strikeouts }}</td>
              <td>{{ formatNumber(stat.avg) }}</td>
              <td>{{ formatNumber(stat.obp) }}</td>
              <td>{{ formatNumber(stat.slg) }}</td>
              <td>{{ formatNumber(stat.ops) }}</td>
              <td>{{ formatNumber(stat.bb_rate) }}</td>
              <td>{{ formatNumber(stat.k_rate) }}</td>
              <td>{{ formatNumber(stat.bb_k_ratio) }}</td>
            </tr>
          </tbody>
          <tfoot class="table-primary fw-bold">
            <tr>
              <th scope="row">{{ totalHitting.season }}</th>
              <td>{{ totalHitting.division }}</td>
              <td v-if="showColumn('player')">{{ formatPlayerFooter(totalHitting.player) }} </td>
              <td v-if="showColumn('gameDate')">{{ totalHitting.games > 0 ? `${totalHitting.games} games` : "" }} </td>
              <td v-if="showColumn('games')">{{ totalHitting.games }}</td>
              <td v-if="showColumn('opponent')"></td>
              <td  v-if="showColumn('result')" colspan="2"></td>
              <td>{{ totalHitting.plate_appearances }}</td>
              <td>{{ totalHitting.at_bats }}</td>
              <td>{{ totalHitting.runs }}</td>
              <td>{{ totalHitting.hits }}</td>
              <td>{{ totalHitting.doubles }}</td>
              <td>{{ totalHitting.triples }}</td>
              <td>{{ totalHitting.home_runs }}</td>
              <td>{{ totalHitting.walks }}</td>
              <td>{{ totalHitting.strikeouts }}</td>
              <td>{{ formatNumber(totalHitting.avg) }}</td>
              <td>{{ formatNumber(totalHitting.obp) }}</td>
              <td>{{ formatNumber(totalHitting.slg) }}</td>
              <td>{{ formatNumber(totalHitting.ops) }}</td>
              <td>{{ formatNumber(totalHitting.bb_rate) }}</td>
              <td>{{ formatNumber(totalHitting.k_rate) }}</td>
              <td>{{ formatNumber(totalHitting.bb_k_ratio) }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    hitting: Array,
    totalHitting: Object,
    season: String,
    division: String,
    sorter: String,
  },
  data() {
    return {
      teamColumns: [{name: 'games', display: 'Games'}],
      seasonColumns: [{name: 'season', display: 'Season'}, {name: 'division', display: 'Division'}],
      playerColumns: [{ name: 'player', display: 'Player'}],
      gameColumns: [{ name: 'gameDate', display: 'Game Date'},
        { name: 'opponent', display: 'Opponent'},
        { name: 'result', display: 'Result', span: 2}],
      columns: [
        {name: 'plate_appearances', display: 'PA'},
        {name: 'at_bats', display: 'AB'},
        {name: 'runs', display: 'R'},
        {name: 'hits', display: 'H'},
        {name: 'doubles', display: '2B'},
        {name: 'triples', display: '3B'},
        {name: 'home_runs', display: 'HR'},
        {name: 'walks', display: 'BB'},
        {name: 'strikeouts', display: 'K'},
        {name: 'avg', display: 'AVG'},
        {name: 'obp', display: 'OBP'},
        {name: 'slg', display: 'SLG'},
        {name: 'ops', display: 'OPS'},
        {name: 'bb_rate', display: 'BB Rate'},
        {name: 'k_rate', display: 'K Rate'},
        {name: 'bb_k_ratio', display: 'BB / K'}],
    }
  },
  methods: {
    showColumn(column) {

      return this.getColumns().some(e => e.name === column);
    },
    formatNumber(mathy) {
      return mathy ? mathy.toFixed(3).replace(/^0+/,'') : '--';
    },
    formatResult(stat) {
      if(stat.result) {
        return `${stat.result.charAt(0)}`;
      }
    },
    formatPlayerFooter(player) {
      return this.$parent.type == 'player' ? player : 'Team';
    },
    getColumns() {
      if(this.$parent.type == 'player') {
        return this.seasonColumns.concat(this.playerColumns).concat(this.gameColumns).concat(this.columns);
      } else if(this.$parent.type == 'games') {
        return this.seasonColumns.concat(this.gameColumns).concat(this.columns);
      } else if(this.$parent.type == 'game') {
        return this.seasonColumns.concat(this.playerColumns).concat(this.gameColumns).concat(this.columns);
      } else if(this.season) {
        return this.seasonColumns.concat(this.playerColumns).concat(this.teamColumns).concat(this.columns);
      } else {
        return this.seasonColumns.concat(this.columns); 
      }
    },
    sortBy(column, season, division) {
      this.$parent.sortBy(column, season, division);
    },
  },
}
</script>