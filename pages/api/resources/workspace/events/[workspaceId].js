import prisma from '@lib/prisma'
import { getSession } from 'next-auth/client'

// GET /api/resource/resourceId
export default async function handle(req, res) {
  const session = await getSession({ req })
  const { method, query } = req

  if (method === 'GET') {
    const { workspaceId, timeMax, timeMin } = query
    const resources = await prisma.resource.findMany({
      where: {
        workspaceId: Number(workspaceId) || -1
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
    res.json(resources || [])
    res.end()
  }

  res.status(401)
}
