import axios from 'axios'
import * as dayjs from 'dayjs'

import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/ca'

dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.locale('ca')
dayjs.tz.setDefault('Europe/Madrid')

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

export const insertEvent = async ({
  resourceId,
  startDate,
  endDate,
  description,
  period = 0,
  userId
}) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/resources/resource/events/${resourceId}`,
    {
      timeMax: dayjs(endDate).endOf('day').toDate(),
      timeMin: dayjs(startDate).startOf('day').toDate(),
      summary: description,
      period: period,
      userId: userId
    }
  )
}

export const deleteEvent = async (resourceId, eventId, startDate, endDate) => {
  return axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/resources/resource/events/${resourceId}?eventId=${eventId}`
  )
}
