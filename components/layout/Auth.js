import { useEffect } from 'react'
import { useSession, signIn } from 'next-auth/client'
import { useRouter } from 'next/router'

import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const Auth = ({ children }) => {
  const [session, loading] = useSession()
  const isUser = !!session?.user
  const router = useRouter()

  const publicPaths = ['/auth/signin']

  const path = router.asPath.split('?')[0]
  const isPublic = publicPaths.includes(path)

  useEffect(() => {
    if (loading) return // Do nothing while loading
    if (!isUser && !isPublic) signIn() // If not authenticated, force log in
  }, [isUser, loading])

  if (isPublic || isUser) {
    return children
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh'
      }}>
      <CircularProgress size={80} />
    </Box>
  )
}

export default Auth
