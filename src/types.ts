export enum GameStatus {
  IN_PROGRESS = 'In Progress',
  POSTPONED = 'Postponed',
  FINAL = 'Final',
  GAME_OVER = 'Game Over',
  PREVIEW = 'Preview',
  PRE_GAME = 'Pre-Game',
  WARMUP = 'Warmup',
}

type Status = {
  // TODO if I can ever figure out all possible statuses, we could drop the | string
  status: GameStatus | string
  inning_state: string
  inning: string
}

type LinescoreItem = {
  home: string
  away: string
}

type Pitcher = {
  id: string
  first: string
  last: string
  wins: string
  losses: string
  era: string
}

type Linescore = {
  inning: LinescoreItem | LinescoreItem[]
  r: LinescoreItem
  h: LinescoreItem
  e: LinescoreItem
}

export type Game = {
  status: Status
  home_probable_pitcher: Pitcher
  away_probable_pitcher: Pitcher
  home_name_abbrev: string
  away_name_abbrev: string
  linescore: Linescore
  venue: string
  time: string
  time_zone: string
  ampm: string
  home_win: string
  home_loss: string
  away_win: string
  away_loss: string
  league: string
}
