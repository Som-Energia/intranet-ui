import { useEffect } from 'react'
import { useSession, signIn } from 'next-auth/client'

import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const RouteGuard = ({ children }) => {
  const [session, loading] = useSession()
  const isUser = !!session?.user

  useEffect(() => {
    if (loading) return // Do nothing while loading
    if (!isUser) signIn() // If not authenticated, force log in
  }, [isUser, loading])

  if (isUser) {
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

export default RouteGuard
