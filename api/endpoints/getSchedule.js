const axios = require("axios");
const format = require("date-fns/format");
const { API_BASE_URL } = require("../constants");

const getSchedule = async (date = new Date()) => {
  const [year, month, day] = format(date, "YYYY/MM/DD").split("/");
  const url = `${API_BASE_URL}/year_${year}/month_${month}/day_${day}/master_scoreboard.json`;
  const result = await axios.get(url);
  return result.data.data.games.game;
};

module.exports = getSchedule;
