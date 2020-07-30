import Table from 'cli-table3'
import { ParsedArgs } from 'minimist'
import format from 'date-fns/format'
import { getSchedule } from '../api'
import { Game, GameStatus } from '../types'
import { fillLinescore, createScoreboardHeader } from '../lib'

interface ScoreboardArgs extends ParsedArgs {
  league?: string
  team?: string
  status?: string
  date?: string
}

export default async (args: ScoreboardArgs) => {
  const games: Game[] = await getSchedule(
    args.date ? args.date : format(new Date(), 'YYYY/MM/DD')
  )

  const scoreboards: Table[] = []

  games.forEach(game => {
    const {
      home_name_abbrev,
      away_name_abbrev,
      linescore,
      home_probable_pitcher,
      away_probable_pitcher,
      home_win,
      home_loss,
      away_win,
      away_loss,
      status,
      league,
    } = game

    const hasNotStarted = [
      GameStatus.PREVIEW,
      GameStatus.PRE_GAME,
      GameStatus.WARMUP,
      GameStatus.POSTPONED,
    ].includes(status.status as GameStatus)

    if (args.team) {
      const selectedTeam = args.team.toUpperCase()

      if (![home_name_abbrev, away_name_abbrev].includes(selectedTeam)) {
        return false
      }
    }

    if (args.league) {
      const selectedLeague = args.league.toUpperCase()

      if (!league.includes(selectedLeague)) {
        return false
      }
    }

    if (args.status) {
      const selectedStatus = args.status.toUpperCase()
      let match = false
      switch (selectedStatus) {
        case 'PREGAME':
          match = hasNotStarted
          break
        case 'LIVE':
          match = [GameStatus.IN_PROGRESS].includes(status.status as GameStatus)
          break
        case 'FINAL':
          match = [GameStatus.FINAL, GameStatus.GAME_OVER].includes(
            status.status as GameStatus
          )
          break
      }

      if (!match) {
        return false
      }
    }

    const scoreboard = new Table({
      head: createScoreboardHeader(game, hasNotStarted),
      style: {
        head: ['blue'],
      },
    })

    if (hasNotStarted && status.status !== GameStatus.POSTPONED) {
      scoreboard.push(
        [
          away_name_abbrev,
          {
            colSpan: 12,
            content: `${away_win} - ${away_loss} | Probable pitcher: ${
              away_probable_pitcher.first
            } ${away_probable_pitcher.last}`,
          },
        ] as any,
        [
          home_name_abbrev,
          {
            colSpan: 12,
            content: `${home_win} - ${home_loss} | Probable pitcher: ${
              home_probable_pitcher.first
            } ${home_probable_pitcher.last}`,
          },
        ] as any
      )
    }

    if (status.status === GameStatus.POSTPONED) {
      scoreboard.push(
        [
          away_name_abbrev,
          {
            colSpan: 24,
            content: 'This game has been postponed',
            hAlign: 'center',
          },
        ] as any,
        [
          home_name_abbrev,
          {
            colSpan: 24,
            content: '',
          },
        ] as any
      )
    }

    if (linescore && Array.isArray(linescore.inning)) {
      const homeScore: string[] = []
      const awayScore: string[] = []

      linescore.inning.forEach(inning => {
        awayScore.push(inning.away)
        homeScore.push(inning.home)
      })

      fillLinescore(awayScore)
      fillLinescore(homeScore)

      scoreboard.push(
        [away_name_abbrev]
          .concat(awayScore)
          .concat(
            linescore && [linescore.r.away, linescore.h.away, linescore.e.away]
          ) as any,
        [home_name_abbrev]
          .concat(homeScore)
          .concat(
            linescore && [linescore.r.home, linescore.h.home, linescore.e.home]
          ) as any
      )
    }

    scoreboards.push(scoreboard as any)
  })

  scoreboards.forEach(scoreboard => {
    console.log(scoreboard.toString())
  })
}
