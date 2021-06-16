import { useEffect } from 'react'
import Head from 'next/head'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { signIn, useSession } from 'next-auth/client'

import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Absences from '@/components/absences/Absences'

require('typeface-montserrat')

export default function AbsencesPage() {
  const classes = useStyles()

  const [session, loading] = useSession()

  useEffect(() => {
    if (!loading && !session) signIn()
  })

  return (
    <>
      <Head>
        <title>Gestor d&apos;absències | Som Energia</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container className={classes.container}>
        <div className={classes.header}>
          <Typography variant="h3" className={classes.title}>
            Gestor d&apos;absències
          </Typography>
          <Breadcrumbs />
        </div>
        {session && <Absences />}
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
    fontFamily: 'Montserrat',
    fontSize: '1.5rem',
    fontWeight: 400
  }
}))
