import minimist from 'minimist'
import scoreboard from './src/cmds/scoreboard'
import version from './src/cmds/version'

module.exports = () => {
  const args = minimist(process.argv.slice(2))
  let cmd = args._[0] || 'help'

  if (args.version || args.v) {
    cmd = 'version'
  }

  if (args.scoreboard) {
    cmd = 'scoreboard'
  }

  switch (cmd) {
    case 'scoreboard':
      scoreboard(args)
      break
    case 'help':
      console.log('Help is unavailable at the moment.')
      break
    case 'version':
      version()
      break
    default:
      console.error(`"${cmd}" is not a valid command.`)
      break
  }
}
