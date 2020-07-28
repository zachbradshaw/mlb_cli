const Table = require("cli-table3");
const chalk = require("chalk");
const { getSchedule } = require("../api");

const fillLineScore = (arr) => {
  if (arr.length < 9) {
    arr.push("-");
    fillLineScore(arr);
  }
  return arr;
};

module.exports = async (args) => {
  const games = await getSchedule();
  const scoreboards = [];

  games.forEach((game) => {
    const {
      home_name_abbrev,
      away_name_abbrev,
      linescore,
      time,
      ampm,
      time_zone,
      venue,
      home_probable_pitcher,
      away_probable_pitcher,
      home_win,
      home_loss,
      away_win,
      away_loss,
      status,
      league
    } = game;
    const hasNotStarted =
      status.status === "Preview" ||
      status.status === "Pre-Game" ||
      status.status === "Warmup";

    if (args.team) {
      const selectedTeam = args.team.toUpperCase();

      if (![home_name_abbrev, away_name_abbrev].includes(selectedTeam)) {
        return false;
      }
    }

    if (args.league) {
      const selectedLeague = args.league.toUpperCase();

      if (!league.includes(selectedLeague)) {
        return false;
      }
    }

    const scoreboard = new Table({
      head: !hasNotStarted
        ? ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "R", "H", "E"].map(
            (val) => {
              if (val === status.inning) {
                val = chalk.underline.red(val);
              }
              return val;
            }
          )
        : [
            "",
            {
              colSpan: 24,
              content: `${time} ${ampm} ${time_zone} | ${venue}`,
              hAlign: "center"
            }
          ],
      style: {
        head: ["blue"]
      }
    });

    const homeScore = [];
    const awayScore = [];

    if (hasNotStarted) {
      scoreboard.push(
        [
          away_name_abbrev,
          {
            colSpan: 24,
            content: `${away_win} - ${away_loss} | Probable pitcher: ${
              away_probable_pitcher.first
            } ${away_probable_pitcher.last}`
          }
        ],
        [
          home_name_abbrev,
          {
            colSpan: 24,
            content: `${home_win} - ${home_loss} | Probable pitcher: ${
              home_probable_pitcher.first
            } ${home_probable_pitcher.last}`
          }
        ]
      );
    }

    if (linescore && Array.isArray(linescore.inning)) {
      linescore.inning.forEach((inning) => {
        awayScore.push(inning.away);
        homeScore.push(inning.home);
      });

      fillLineScore(awayScore);
      fillLineScore(homeScore);

      scoreboard.push(
        [away_name_abbrev]
          .concat(awayScore)
          .concat(
            linescore && [linescore.r.away, linescore.h.away, linescore.e.away]
          ),
        [home_name_abbrev]
          .concat(homeScore)
          .concat(
            linescore && [linescore.r.home, linescore.h.home, linescore.e.home]
          )
      );
    }

    scoreboards.push(scoreboard);
  });

  scoreboards.forEach((scoreboard) => {
    console.log(scoreboard.toString());
  });
};
