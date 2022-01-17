import prisma from '@lib/prisma'

// GET /api/resource/resourceId
export default async function handle(req, res) {
  const { resourceId, startDate, endDate } = req.query
  const resource = await prisma.resource.findUnique({
    where: {
      id: Number(resourceId) || -1
    },
    include: {
      events: {
        where: {
          startDate: startDate,
          endDate: endDate
        },
        select: {
          id: true,
          summary: true,
          userId: true
        }
      }
    }
  })
  res.json(resource)
}
