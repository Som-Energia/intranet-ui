import prisma from '@lib/prisma'

// GET /api/workspace
export default async function handle(req, res) {
  const allWorkspaces = await prisma.workspace.findMany({
    where: {
      published: true
    }
  })
  res.json(allWorkspaces)
}
