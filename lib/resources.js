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
  return event?.userId === user.email
}

export const getWorkspaces = async () => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/resources/workspace`)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
      return error
    })
}

export const getResources = async (workspaceId) => {
  return axios
    .get(
      `${process.env.NEXT_PUBLIC_API_URL}/resources/workspace/${workspaceId}`
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
      return error
    })
}

export const getEvents = async (resourceId, startDate, endDate) => {
  return axios
    .get(
      `${process.env.NEXT_PUBLIC_API_URL}/resources/resource/events/${resourceId}?timeMax=${endDate}&timeMin=${startDate}`
    )
    .then((res) => res.data)
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
      return error
    })
}

export const insertEvent = async (
  resourceId,
  startDate,
  endDate,
  description,
  period = 'd'
) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/resources/resource/events/${resourceId}`,
    {
      timeMax: new Date(endDate),
      timeMin: new Date(startDate),
      summary: description,
      period: period
    }
  )

  /*
  let currentDate = dayjs(startDate)
  const events = []
  while (currentDate.isBefore(endDate)) {
    events.push({
      startDate: currentDate.toISOString(),
      endDate: currentDate.add(1, 'd').toISOString(),
      summary: description,
      resourceId: resourceId,
      userId: 
    })
    currentDate = currentDate.add(1, !period ? 'd' : 'w')
  }

  throw new Error('El recurs no està disponible algun dels dies seleccionats') 
  */
  // const events = await getEvents(resourceId, startDate, endDate)
  // if (events?.events.length === 0) {
  // }
}

const postInsertEvent = async (resourceId, startDate, endDate, description) => {
  const events = await getEvents(resourceId, startDate, endDate)
  if (events?.events.length === 0) {
    return axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/resources/resource/events/${resourceId}`,
      {
        timeMax: new Date(endDate),
        timeMin: new Date(startDate),
        summary: description
      }
    )
  }
  throw new Error('El recurs no està disponible algun dels dies seleccionats')
}

export const deleteEvent = async (resourceId, eventId, startDate, endDate) => {
  return axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/resources/resource/events/${resourceId}?eventId=${eventId}`
  )
}
