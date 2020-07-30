import chalk from 'chalk'
import { Game, GameStatus } from '../types'

const SCOREBOARD_HEADER = [
  '',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'R',
  'H',
  'E',
]

export const createScoreboardHeader = (game: Game, hasNotStarted: boolean) => {
  const { status, time, ampm, time_zone, venue } = game

  const inProgress = SCOREBOARD_HEADER.map(val => {
    if (val === status.inning) {
      // Change color to indicate current inning
      val = chalk.underline.red(val)
    }
    return val
  })

  const preGame = ['', `${time} ${ampm} ${time_zone} | ${venue}`]

  return !hasNotStarted
    ? inProgress
    : status.status === GameStatus.POSTPONED
    ? []
    : preGame
}
