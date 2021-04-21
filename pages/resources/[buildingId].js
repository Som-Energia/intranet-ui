import { useEffect } from 'react'
import { getToken } from 'next-auth/jwt'

import Head from 'next/head'
import { signIn, useSession, getSession } from 'next-auth/client'

import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Breadcrumbs from 'components/layout/Breadcrumbs'
import Workspace from 'components/resources/Workspace'

import { resources, getResources, getEvents } from 'lib/resources'

export default function ResourcePage({
  resourcesMap,
  eventsMap,
  buildingId,
  token
}) {
  const classes = useStyles()
  const [session, loading] = useSession()

  useEffect(() => {
    if (!loading && !session) signIn()
  })

  console.log(eventsMap)

  return (
    <>
      <Head>
        <title>Reserva d&apos;espais | Som Energia</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container className={classes.container}>
        <div className={classes.header}>
          <Typography variant="h3" className={classes.title}>
            {resources.find((resource) => resource.id === buildingId)?.name}
          </Typography>
          <Breadcrumbs />
        </div>
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
    /* eventsMap[item.resourceName] = await getEvents(
      token.accessToken,
      item?.resourceEmail
    ) */
  }

  return {
    props: { resourcesMap, eventsMap, token: token.accessToken, buildingId } // will be passed to the page component as props
  }
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4)
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 400
  }
}))
