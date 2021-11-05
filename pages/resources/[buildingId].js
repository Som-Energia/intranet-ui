import { useEffect } from 'react'
import { getToken } from 'next-auth/jwt'

import Head from 'next/head'
import { signIn, useSession, getSession } from 'next-auth/client'

import { Box, Container, Typography } from '@mui/material'
import { useTheme } from '@mui/styles'

import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'

import Breadcrumbs from 'components/layout/Breadcrumbs'
import Workspace from 'components/resources/Workspace'

import { resources, getResources } from 'lib/resources'
require('typeface-montserrat')

export default function ResourcePage(props) {
  const theme = useTheme()
  const [session, loading] = useSession()

  const { resourcesMap, eventsMap, buildingId, token } = props

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
      <Container sx={{ padding: theme.spacing(4) }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'Montserrat',
              fontSize: '1.5rem',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center'
            }}>
            <PlaceOutlinedIcon />
            &nbsp;
            {resources.find((resource) => resource.id === buildingId)?.name}
          </Typography>
          <Breadcrumbs />
        </Box>
        
        {session && (
          <Workspace
            resources={resourcesMap}
            events={eventsMap}
            buildingId={buildingId}
            token={token}
          />
        )}
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

  const { buildingId } = context.query
  const secret = process.env.SECRET
  const req = context.req
  const token = await getToken({ req, secret })

  const resources = (await getResources(token.accessToken, buildingId)) || []

  const eventsMap = {}
  const resourcesMap = {}
  const items = resources?.items || []
  for (const item of items) {
    resourcesMap[item.resourceName] = { ...item }
  }

  return {
    props: { resourcesMap, eventsMap, token: token.accessToken, buildingId } // will be passed to the page component as props
  }
}
