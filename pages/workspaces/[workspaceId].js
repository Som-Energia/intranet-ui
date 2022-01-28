import { useEffect } from 'react'
import { getToken } from 'next-auth/jwt'

import Head from 'next/head'
import { signIn, useSession, getSession } from 'next-auth/client'

import { Box, Container, Typography } from '@mui/material'
import { useTheme } from '@mui/styles'

import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'

import Breadcrumbs from 'components/layout/Breadcrumbs'
import Workspace from 'components/resources/Workspace'

import { getResources } from 'lib/resources'
require('typeface-montserrat')

export default function ResourcePage(props) {
  const theme = useTheme()
  const [session, loading] = useSession()

  const { token, workspaceId, date, workspace } = props

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
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              whiteSpace: 'nowrap'
            }}>
            <PlaceOutlinedIcon />
            &nbsp;
            {workspace?.name}
          </Typography>
          <Breadcrumbs />
        </Box>
        <Box sx={{ paddingTop: '24px' }}>
          {session && (
            <Workspace
              {...workspace}
              workspaceId={workspaceId}
              initialDate={date}
            />
          )}
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
    return { props: {} }
  }

  const { workspaceId, date = false } = context.query
  const secret = process.env.SECRET
  const req = context.req
  const token = await getToken({ req, secret })

  const numWorkspaceId = workspaceId.replace(/-.*/, '')
  const workspace = (await getResources(numWorkspaceId)) || []

  return {
    props: {
      token: token.accessToken,
      workspace,
      workspaceId: numWorkspaceId,
      date
    } // will be passed to the page component as props
  }
}
