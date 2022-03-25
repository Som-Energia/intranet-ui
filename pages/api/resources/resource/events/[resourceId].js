import prisma from '@lib/prisma'
import { isRRHH } from '@lib/utils'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { getSession } from 'next-auth/client'

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

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
    let currentDate = !period
      ? dayjs(timeMin)
      : dayjs(timeMin).isoWeekday(period)

    if (dayjs(timeMax).isBefore(timeMin, 'day')) {
      res.status(403).send({ error: 'timeMin is not greater than timeMax' })
      return res.end()
    }

    if (dayjs(currentDate).isBefore(dayjs().startOf('day'), 'day')) {
      res.status(403).send({ error: 'date is gone' })
      return res.end()
    }

    if (dayjs(currentDate).isAfter(dayjs().endOf('year'), 'day')) {
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
