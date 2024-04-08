<template>
  <div class="container-fluid">
    <div class="row m-2">
      <div class="col"><button type="button" class="btn btn-primary" @click="refresh">Refresh Data</button></div>
      <div id="divisions" class="col">
        <div class="form-check form-check-inline" v-for="division in divisionList" v-bind:key="division">
          <input class="form-check-input" type="checkbox" v-model="division.enabled" :value="division.enabled" @change="handleCheckboxChange">
          <label class="form-check-label" for="${division.name}">{{ division.name }}</label>
        </div>
      </div>
    </div>

    <div class="row" v-for="division in divisions" v-bind:key="division">
      <Standings :standings="standings[division]" :division="division" :selectTeam="team"></Standings>
      <Schedule :schedule="schedule[division]" :division="division" :team="team" :maxHeight="tableHeight[division]"></Schedule>
    </div>
    <div class="row">
      <FullSchedule v-for="division in divisions" v-bind:key="division" :schedule="schedule[division]" :division="division" :team="team"></FullSchedule>
    </div>
      
  </div>
  </template>

<script>
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

import axios from 'axios';
import utils from '../utils'
import Standings from './Standings'
import Schedule from './Schedule'
import FullSchedule from './FullSchedule'

export default {
  components: {
    'Standings': Standings,
    'Schedule': Schedule,
    'FullSchedule': FullSchedule,
  },
  data() {
    return {
      standings: {
        pinto: [],
        mustang: [],
      },
      schedule: {
        pinto: [],
        mustang: []
      },
      tableHeight: {
        'pinto-8': '380px',
        mustang: '540px',
      },
      divisions: [''],
      divisionList: [{ name: 'shetland', enabled: false }, { name: 'mustang', enabled: true }, { name: 'pinto-7', enabled: true }, { name: 'pinto-8', enabled: false }],
      team: 'Blue Jays (McAnoy)'
    };
  },
  methods: {
    refresh() {
      this.divisions.forEach((division) => {
        this.standings[division] = [];
        this.schedule[division] = [];
        this.getStandingsAndSchedule(division);
      });
    },
    handleCheckboxChange() {
      const divisions = this.divisionList.reduce(function(filtered, div)  {
        if(div.enabled) {
          filtered.push(div.name);
        }
        return filtered;
      },[]);

      if(divisions.length > 0) {
        divisions.forEach((division) =>  {
          if(!this.standings[division]) {
            this.standings[division] = [];
          }
          if(this.standings[division].length == 0 || this.schedule[division].length == 0) {
            this.getStandingsAndSchedule(division);
          }
        });
        this.divisions = divisions;
        const division = divisions.join('+');
        const team = this.team;
        this.$router.push({ name: 'Baseball', params: { division, team } }) ;
      }
    },
    getStandingsAndSchedule(division) {
      const self = this;
      axios.get(`${process.env.VUE_APP_API_URL}/api/toluca?league=${division}`)
        .then((response) => {
          self.standings[division] = response.data.standings;
          self.schedule[division] = response.data.schedule.sort(utils.sortSchedule);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getSingleTeamSchedule(division) {
      const self = this;
      const sked = self.schedule[division];
      return sked.filter((game) => game.home == self.team || game.away == self.team);
    },
  },
  watch: {
    $route () {
      const team = this.$route.params.team.replaceAll('+', ' ');
      this.team = team ? team : 'Blue Jays (McAnoy)';

      const divisions = this.$route.params.division.split('+').filter((div) => div != '');
      if(divisions.length == 0) {
        divisions.push("mustang");
        divisions.push("pinto");
      }
    }
  },
  mounted() {
    const divisions = this.$route.params.division.split('+').filter((div) => div != '');
    if(divisions.length == 0) {
      divisions.push("mustang");
      divisions.push("pinto-8");
    }

    this.divisionList.forEach((div) => {
      div.enabled = divisions.includes(div.name);
    });

    let team = this.$route.params.team.replaceAll('+', ' ');
    if(!team) {
      team = 'Blue Jays (McAnoy)';
    }
    this.team = team;
    this.divisions = divisions;

    divisions.forEach((division) => {
      this.getStandingsAndSchedule(division);
    });
  },
};
</script>