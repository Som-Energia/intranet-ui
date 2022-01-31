import prisma from '@lib/prisma'
import dayjs from 'dayjs'
import { getSession } from 'next-auth/client'

// GET /api/resource/resourceId
export default async function handle(req, res) {
  const session = await getSession({ req })
  const { method, query, body } = req

  if (method === 'DELETE') {
    const resource = await prisma.event.deleteMany({
      where: {
        id: Number(query.eventId),
        resourceId: Number(query.resourceId),
        userId: session?.user?.email
      }
    })
    res.json(resource)
    res.end()
  }

  if (method === 'POST') {
    const { timeMin, timeMax, summary, period } = body
    const events = []
    let currentDate = dayjs(timeMin)

    if (dayjs(timeMax).isBefore(timeMin, 'day')) {
      res
        .status(403)
        .send({ error: 'timeMin is not greater than timeMax' })
        .end()
    }

    if (dayjs().isAfter(currentDate, 'day')) {
      res.status(403).send({ error: 'date is gone' }).end()
    }

    while (currentDate.isBefore(timeMax)) {
      events.push({
        startDate: currentDate.toISOString(),
        endDate: currentDate.add(1, 'd').toISOString(),
        summary: summary,
        resourceId: Number(query.resourceId),
        userId: session?.user?.email
      })
      currentDate = currentDate.add(1, !period ? 'd' : 'w')
    }

    const result = await prisma.event.createMany({
      data: events
    })
    res.json(result)
    res.end()
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
    res.end()
  }

  res.status(401)
}
