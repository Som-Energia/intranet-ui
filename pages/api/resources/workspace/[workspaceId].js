import prisma from '@lib/prisma'

// GET /api/workspace/workspaceId
export default async function handle(req, res) {
  const { workspaceId } = req.query
  const workspace = await prisma.workspace.findUnique({
    where: {
      id: Number(workspaceId) || -1
    },
    include: {
      resources: {
        where: {
          published: true
        },
        select: {
          id: true,
          name: true,
          workspaceId: true
        }
      }
    }
  })
  res.json(workspace)
}
