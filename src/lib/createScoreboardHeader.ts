import chalk from 'chalk'
import { Game } from '../types'

export const createScoreboardHeader = (
  hasNotStarted: boolean,
  headerCols: string[],
  game: Game
) => {
  const { status, time, ampm, time_zone, venue } = game

  const inProgress = headerCols.map(val => {
    if (val === status.inning) {
      // Change color to indicate current inning
      val = chalk.underline.red(val)
    }
    return val
  })

  const preGame = ['', `${time} ${ampm} ${time_zone} | ${venue}`]

  return !hasNotStarted ? inProgress : preGame
}
