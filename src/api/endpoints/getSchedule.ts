import axios from 'axios'
import { API_BASE_URL } from '../constants'

export const getSchedule = async (date: string) => {
  const [year, month, day] = date.split('/')
  const url = `${API_BASE_URL}/year_${year}/month_${month}/day_${day}/master_scoreboard.json`
  const result = await axios.get(url)
  return result.data.data.games.game
}
