const REMOTE_HOST = 'http://snag1.somenergia.lan'

export const getRemoteData = async () => {
  const res = await fetch(`${REMOTE_HOST}/webforms-analytics.json`)
  const data = await res.json()
  return data
}

export const getLastDays = (data, offset) => {
  return data.slice(-offset)
}

export const getMonthData = (data, month) => {
  return data
}
