<template>
  <div class="container-fluid">
    <div class="row m-2"  v-for="hits in hitting" v-bind:key="hits">
      <StatsTable :hitting="hits.players" :totalHitting="hits.team" :season="hits.team.season" :division="hits.team.division" :sorter="sortKey"/>
    </div>
  </div>
</template>
<script>
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
import axios from 'axios';
import StatsTable from './StatsTable.vue';

export default {
  components: {
    'StatsTable': StatsTable,
  },
  data() {
    return {
      type: '',
      hitting: [],
      teamHitting: [],
      sortKey: 'games',
      reverse: true,
      division: '',
    }
  },
  methods: {
    getHeader(team) {
      return `${team.season} ${team.division}`
    },
    getSeasonGames(season, division) {
      const self = this;
      self.type = 'games';

      axios.get(`${process.env.VUE_APP_API_URL}/api/baseball/season/${season}/division/${division}`).then((response) => {
        let hitting = response.data;
          hitting.players = hitting.games;
          self.hitting = [hitting];
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getPlayerHitting(player) {
      const self = this;
      self.type = 'player';

      axios.get(`${process.env.VUE_APP_API_URL}/api/baseball/career/${player}`).then((response) => {
          self.hitting = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getHitting() {
      const self = this;
      self.type = 'team';

      axios.get(`${process.env.VUE_APP_API_URL}/api/baseball/seasons`).then((response) => {
          self.hitting = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getGameHitting(gamedate, division) {
      const self = this;
      self.type = 'game';

      axios.get(`${process.env.VUE_APP_API_URL}/api/baseball/game/${gamedate}/division/${division}`).then((response) => {
          self.hitting = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    sortBy(sortKey, season, division) {
      this.reverse = (this.sortKey == sortKey) ? ! this.reverse : true;
      this.sortKey = sortKey;

      this.hitting.forEach((hitsy) => {
        if(hitsy.season == season && hitsy.division == division) {
          if(["season", "division", "opponent", "result", "gamedate", "player"].includes(sortKey)) {
            hitsy.players.sort((a,b) => {
              if(this.reverse) {
                return b[sortKey].localeCompare(a[sortKey]);
              } else {
                return a[sortKey].localeCompare(b[sortKey]);
              }
            });
          } else {
            hitsy.players.sort((a,b) => {
              if(this.reverse) {
                return b[sortKey] - a[sortKey];
              } else {
                return a[sortKey] - b[sortKey];
              }
            });
          }
        }
      });

    },
  },
  watch: {
    $route () {
      const player = this.$route.params.player;
      const gamedate = this.$route.params.gamedate;
      const division = this.$route.params.division;
      console.warn("division", division, "player", player, "gamedate", gamedate);
      if(player) {
        this.getPlayerHitting(player);
      } else if(gamedate && division) {
        this.$route.fullPath.startsWith("/stats/games") ? this.getSeasonGames(gamedate, division) : this.getGameHitting(gamedate, division);
      } else {
        this.getHitting();
      }
    }
  },
  mounted() {
    this.getHitting();
  }
}
</script>