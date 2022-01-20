import { useEffect } from 'react'
import Head from 'next/head'
import { signIn, useSession, getSession } from 'next-auth/client'

import { Container, Typography, Box } from '@mui/material'
import { useTheme } from '@mui/styles'

import WorkspaceList from 'components/resources/WorkspaceList'
import Breadcrumbs from '@components/layout/Breadcrumbs'
import { getWorkspaces } from '@lib/resources'

require('typeface-montserrat')

export default function WorkspacesPage(props) {
  const theme = useTheme()
  const [session, loading] = useSession()
  const { workspaces } = props

  useEffect(() => {
    if (!loading && !session) signIn()
  })

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signIn() // Force sign in to hopefully resolve error
    }
  }, [session])

  return (
    <>
      <Head>
        <title>Reserva d&apos;espais | Som Energia</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container
        sx={{
          padding: theme.spacing(2),
          '@media (min-width: 780px)': {
            padding: theme.spacing(4)
          }
        }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            '@media (max-width: 780px)': {
              flexDirection: 'column-reverse',
              alignItems: 'flex-start',
              justifyContent: 'flex-start'
            }
          }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'Montserrat',
              fontSize: '1.5rem',
              fontWeight: 500
            }}>
            Reserva d&apos;espais
          </Typography>
          <Breadcrumbs />
        </Box>
        <Box sx={{ paddingTop: '24px' }}>
          {session && <WorkspaceList workspaces={workspaces} />}
        </Box>
      </Container>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) {
    context.res.statusCode = 302
    context.res.setHeader('Location', '/auth/signin')
  }

  const workspaces = await getWorkspaces()
  return { props: { workspaces } }
}
