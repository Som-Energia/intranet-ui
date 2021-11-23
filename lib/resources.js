import axios from 'axios'
import * as dayjs from 'dayjs'
import 'dayjs/locale/ca'

export const resources = [
  {
    id: 'TXERNOBIL',
    name: 'Txernòbil',
    place: 'Edifici Airborne',
    buildingId: 'TXERNOBIL'
  },
  {
    id: 'GIROEMPREN',
    name: 'Balneari',
    place: 'Giroemprèn',
    buildingId: 'GIROEMPREN'
  },
  {
    id: 'MONTURIOL',
    name: 'Jungla de Cristall',
    place: 'Narcís Monturiol',
    buildingId: '001'
  }
]

export const isOwner = (event, user) => {
  return event?.items?.[0]?.creator?.email === user.email
}

export const getResources = async (token, buildingId) => {
  const customer = 'my_customer'
  return axios
    .get(
      `https://admin.googleapis.com/admin/directory/v1/customer/${customer}/resources/calendars`,
      {
        params: {
          maxResults: 500
        },
        headers: { Authorization: 'Bearer ' + token }
      }
    )
    .then((res) => {
      return res.data
    })
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
      return error
    })
}

export const insertEvent = async (
  token,
  calendarId,
  startDate,
  endDate,
  description,
  period
) => {
  let currentDate = dayjs(startDate)
  const responses = []
  while (currentDate.isBefore(endDate)) {
    responses.push(
      postInsertEvent(
        token,
        calendarId,
        currentDate.toISOString(),
        currentDate.add(1, 'd').toISOString(),
        description
      )
    )
    currentDate = currentDate.add(1, !period ? 'd' : 'w')
  }

  return Promise.all(Object.values(responses))
}

const postInsertEvent = async (
  token,
  calendarId,
  startDate,
  endDate,
  description
) => {
  const events = await getEvents(token, calendarId, startDate, endDate)
  if (events?.items.length === 0) {
    const params = {
      end: { dateTime: endDate },
      start: { dateTime: startDate },
      summary: description,
      status: 'confirmed'
    }
    return axios.post(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
      params,
      {
        headers: { Authorization: 'Bearer ' + token }
      }
    )
  }
  throw new Error('El recurs no està disponible algun dels dies seleccionats')
}

export const deleteEvent = async (token, calendarId, eventId) => {
  return axios.delete(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}`,
    {
      headers: { Authorization: 'Bearer ' + token }
    }
  )
}
