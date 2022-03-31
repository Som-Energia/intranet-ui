import prisma from '@lib/prisma'
import { isRRHH } from '@lib/utils'
import dayjs from 'dayjs'

import { getSession } from 'next-auth/client'

import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/ca'

dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

dayjs.locale('ca')

// GET /api/resources/resource/events/resourceId
export default async function handle(req, res) {
  const session = await getSession({ req })
  const { method, query, body } = req

  if (method === 'DELETE') {
    const resource = await prisma.event.deleteMany({
      where: {
        id: Number(query.eventId),
        resourceId: Number(query.resourceId),
        userId: !isRRHH(session?.user) ? session?.user?.email : undefined
      }
    })
    res.json(resource)
    return res.end()
  }

  if (method === 'POST') {
    const { timeMin, timeMax, summary, period, userId } = body
    const events = []
    const today = dayjs().tz('Europe/Madrid')
    let currentDate = !period
      ? dayjs(timeMin).startOf('day').tz('Europe/Madrid')
      : dayjs(timeMin).tz('Europe/Madrid').isoWeekday(period).startOf('day')

    if (dayjs(timeMax).tz('Europe/Madrid').isBefore(timeMin, 'day')) {
      res.status(403).send({ error: 'timeMin is not greater than timeMax' })
      return res.end()
    }

    if (today.startOf('day').isAfter(currentDate, 'day')) {
      res.status(403).send({
        error: `date is gone: ${today.startOf('day').format()} > ${dayjs(
          currentDate
        )
          .tz('Europe/Madrid')
          .format()} - ${currentDate}`
      })
      return res.end()
    }

    if (dayjs(currentDate).isAfter(today.endOf('year'), 'day')) {
      res.status(403).send({ error: 'date is next year' })
      return res.end()
    }

    const userEmail =
      userId && isRRHH(session?.user) ? userId : session?.user?.email

    while (currentDate.isSameOrBefore(timeMax, 'day')) {
      events.push({
        startDate: currentDate.toISOString(),
        endDate: currentDate.add(1, 'd').toISOString(),
        summary: summary,
        resourceId: Number(query.resourceId),
        userId: userEmail
      })
      currentDate = currentDate.add(1, !period ? 'd' : 'w')
    }

    const result = await prisma.event.createMany({
      data: events
    })

    res.json(result)
    return res.end()
  }

  if (method === 'GET') {
    const { resourceId, timeMax, timeMin } = req.query
    const resource = await prisma.resource.findUnique({
      where: {
        id: Number(resourceId) || -1
      },
      include: {
        events: {
          where: {
            startDate: {
              gte: new Date(timeMin)
            },
            endDate: {
              lte: new Date(timeMax)
            }
          },
          select: {
            id: true,
            summary: true,
            userId: true
          }
        }
      }
    })
    res.json(resource || [])
    return res.end()
  }

  res.status(401)
}
