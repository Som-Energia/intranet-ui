import { useEffect } from 'react'
import Head from 'next/head'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { signIn, useSession } from 'next-auth/client'

import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import WorkspaceList from 'components/resources/WorkspaceList'

export default function ResourcesPage() {
  const classes = useStyles()

  const [session, loading] = useSession()

  useEffect(() => {
    if (!loading && !session) signIn()
  })

  return (
    <>
      <Head>
        <title>Reserva d&apos;espais | Som Energia</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container className={classes.container}>
        <div className={classes.header}>
          <Typography variant="h3" className={classes.title}>
            Reserva d&apos;espais
          </Typography>
          <Breadcrumbs />
        </div>
        {session && <WorkspaceList />}
      </Container>
    </>
  )
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