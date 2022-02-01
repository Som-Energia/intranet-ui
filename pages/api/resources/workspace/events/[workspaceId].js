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
        workspaceId: Number(workspaceId) || -1,
        published: true
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
          }
        }
      }
    })
    res.json(resources || [])
    res.end()
  }

  res.status(401)
}
