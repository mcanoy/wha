import dayjs from 'dayjs';

function getWinner(game) {
      
  if(!game.homeScore) {
    return '--';
  }

  const homeScore = Number(game.homeScore);
  const awayScore = Number(game.awayScore);

  if(homeScore == awayScore) {
    return 'T';
  }

  if(homeScore > awayScore) {
    return "H"
  }

  if(homeScore < awayScore) {
    return "A"
  }

  return '?';
}

function getDate(game) {
  const gameDay = dayjs().year() + `/${game.date.split(" ")[1]} ${game.time}`;
  return dayjs(gameDay, "YYYY/M/D h:mm A")
}

function shortTeamName(team) {
  const regex = / \(.*\)/i;
  return team.replace(regex, '')
}

function properDivision(division) {
  if(!division) {
    return '';
  }
  return division[0].toUpperCase() + division.slice(1);
}

function encodeSlash(text) {
  return text.replace(/\//g, "%2F");
}

function filterScheduleByTeam(sked, team) {
  return sked.filter((game) => game.home == team || game.away == team);
}

function sortSchedule(gameA, gameB) {
  const gameAString = dayjs().year() + `/${gameA.date.split(" ")[1]} ${gameA.time}`;
  const gameBString = dayjs().year() + `/${gameB.date.split(" ")[1]} ${gameB.time}`;

  const a = dayjs(gameAString, "YYYY/M/D h:mm A")
  const b = dayjs(gameBString, "YYYY/M/D h:mm A")

  const now = dayjs().subtract(3, 'day');

  //both past
  if(now.isAfter(a) && now.isAfter(b)) {
    return a.diff(b);
  }

  //both future
  if(now.isBefore(a) && now.isBefore(b)) {
    return a.diff(b);
  }

  //if a is past then show it later in sort
  return b.diff(a);

}


export default { sortSchedule, getDate, shortTeamName, properDivision, filterScheduleByTeam, getWinner, encodeSlash }