const axios = require("axios");
const { format } = require("date-fns");
const Table = require("cli-table3");
const { getSchedule } = require("mlb_api");

module.exports = async args => {
  const schedule = await getSchedule();
  console.log(schedule);
  //const { date } = args;
  //const [month, day, year] = format(new Date(), "MM/DD/YYYY").split("/");
  //const url = `http://gd.mlb.com/components/game/mlb/year_${year}/month_${month}/day_${day}/master_scoreboard.json`;
  //axios.get(url).then(resp => {
  //const gameData = resp.data.data.games.game;
  //gameData.forEach(game => {
  //const boxScore = new Table({
  //head: [
  //"Team",
  //"1",
  //"2",
  //"3",
  //"4",
  //"5",
  //"6",
  //"7",
  //"8",
  //"9",
  //"R",
  //"H",
  //"E"
  //]
  //});
  //const {
  //home_team_city,
  //home_team_name,
  //away_team_city,
  //away_team_name,
  //linescore
  //} = game;

  //const homeScore = linescore.inning.map(i => i.home);
  //const awayScore = linescore.inning.map(i => i.away);

  //boxScore.push(
  //[`${away_team_city}`]
  //.concat(awayScore)
  //.concat([linescore.r.away, linescore.h.away, linescore.e.away]),
  //[`${home_team_city}`]
  //.concat(homeScore)
  //.concat([linescore.r.home, linescore.h.away, linescore.e.away])
  //);
  ////      console.log(boxScore.toString());
  //});
  //});
};
