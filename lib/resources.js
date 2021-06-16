import axios from 'axios'

export const resources = [
  {
    id: 'MONTURIOL',
    name: 'Jungla de Cristall',
    place: 'Narcís Monturiol',
    buildingId: 'MONTURIOL'
  },
  {
    id: 'GIROEMPREN',
    name: 'Balneari',
    place: 'Giroemprèn',
    buildingId: 'GIROEMPREN'
  },
  {
    id: 'CASADEMONT',
    name: 'Casademont',
    place: 'Jaume Casademont',
    buildingId: 'CASADEMONT'
  },
  {
    id: 'AIRBORNE',
    name: 'Txernòbil',
    place: 'Edifici Airborne',
    buildingId: 'AIRBORNE'
  }
]

export const getResources = async (token, buildingId) => {
  const customer = 'my_customer'
  return axios
    .get(
      `https://admin.googleapis.com/admin/directory/v1/customer/${customer}/resources/calendars/`,
      { headers: { Authorization: 'Bearer ' + token } }
    )
    .then((res) => res.data)
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
      return null
    })
}

export const getEvents = async (token, calendarId, startDate, endDate) => {
  return axios
    .get(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/?singleEvents=true&timeMax=${endDate}&timeMin=${startDate}`,
      {
        headers: { Authorization: 'Bearer ' + token }
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
      return null
    })
}

export const insertEvent = async (
  token,
  calendarId,
  startDate,
  endDate,
  description
) => {
  return axios.post(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
    {
      start: startDate,
      end: endDate,
      description: description
    },
    {
      headers: { Authorization: 'Bearer ' + token }
    }
  )
}
