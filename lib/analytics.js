import axios from 'axios'
import * as https from 'https'
const REMOTE_HOST = 'https://api.somenergia.coop/analytics'

export const getRemoteData = async () => {
  const agent = new https.Agent({
    rejectUnauthorized: false
  })
  const res = await axios.get(`${REMOTE_HOST}/webforms-analytics.json`, {
    httpsAgent: agent
  })
  return res.data
}

export const getLastDays = (data, offset) => {
  return data.slice(-offset)
}

export const getMonthData = (data, month) => {
  return data
}
