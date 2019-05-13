const minimist = require("minimist");

module.exports = () => {
  const args = minimist(process.argv.slice(2));
  let cmd = args._[0] || "help";

  if (args.version || args.v) {
    cmd = "version";
  }

  if (args.linescore) {
    cmd = "linescore";
  }

  switch (cmd) {
    case "linescore":
      require("./cmds/linescore")(args);
      break;
    case "help":
      console.log("Help is unavailable at the moment.");
      break;
    case "version":
      require("./cmds/version")(args);
      break;
    default:
      console.error(`"${cmd}" is not a valid command.`);
      break;
  }
};