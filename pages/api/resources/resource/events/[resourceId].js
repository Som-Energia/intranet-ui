import prisma from '@lib/prisma'
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
    const resource = await prisma.event.create({
      data: {
        resourceId: Number(query.resourceId),
        startDate: new Date(body.timeMin),
        endDate: new Date(body.timeMax),
        summary: body?.summary,
        userId: session?.user?.email
      }
    })
    res.json(resource)
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
