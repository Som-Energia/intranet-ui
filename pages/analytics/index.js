import { useEffect, useState } from 'react'
import Head from 'next/head'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { signIn, useSession, getSession } from 'next-auth/client'

import { Container, Typography, Paper, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { getRemoteData, getLastDays } from '@/lib/analytics'
import { isIT } from '@/lib/utils'

import AnalyticsBarChart from '@/components/analytics/BarChart'

import * as dayjs from 'dayjs'
import 'dayjs/locale/ca'

require('typeface-montserrat')

export default function WebformsAnalytics() {
  const classes = useStyles()
  dayjs.locale('ca')

  const [session, loading] = useSession()
  const [clientSide, setClientSide] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    if (!loading && !session) signIn()
  })

  useEffect(() => {
    setClientSide(true)
  }, [])

  useEffect(() => {
    async function getRemoteDataAsync() {
      const remoteData = await getRemoteData()
      setData(remoteData)
    }
    getRemoteDataAsync()
  }, [clientSide])

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signIn() // Force sign in to hopefully resolve error
    }
  }, [session])

  return (
    <>
      <Head>
        <title>Analytics | Som Energia</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container className={classes.container}>
        <div className={classes.header}>
          <Typography variant="h3" className={classes.title}>
            Webforms Analytics
          </Typography>
          <Breadcrumbs />
        </div>
        <div suppressHydrationWarning={true}>
          {process.browser && (
            <Grid container spacing={3} style={{ marginTop: '8px' }}>
              <Grid item xs={12} sm={6}>
                <Paper elevation={0} className={classes.paper}>
                  <h3 className={classes.paperTitle}>
                    Contractacions darrers 7 dies
                  </h3>
                  <AnalyticsBarChart
                    data={getLastDays(data, 7)}
                    mainValue="contracts_success"
                    secondaryValue="contracts_fail"
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper elevation={0} className={classes.paper}>
                  <h3 className={classes.paperTitle}>
                    Altes de socia darrers 7 dies
                  </h3>
                  <AnalyticsBarChart
                    data={getLastDays(data, 7)}
                    mainValue="members_success"
                    secondaryValue="members_fail"
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper elevation={0} className={classes.paper}>
                  <h3 className={classes.paperTitle}>
                    Canvis de titular darrers 7 dies
                  </h3>
                  <AnalyticsBarChart
                    data={getLastDays(data, 7)}
                    mainValue="holderchanges_success"
                    secondaryValue="holderchanges_fail"
                  />
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Paper elevation={0} className={classes.paper}>
                  <h3 className={classes.paperTitle}>
                    Modificacions contractuals darrers 7 dies
                  </h3>
                  <AnalyticsBarChart
                    data={getLastDays(data, 7)}
                    mainValue="modification_success"
                    secondaryValue="modification_fail"
                  />
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Paper elevation={0} className={classes.paper}>
                  <h3 className={classes.paperTitle}>
                    Acceptació/Rebuig D1 darrers 7 dies
                  </h3>
                  <AnalyticsBarChart
                    data={getLastDays(data, 7)}
                    mainValue="d1_success"
                    secondaryValue="d1_fail"
                  />
                </Paper>
              </Grid>
            </Grid>
          )}
        </div>
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
    fontWeight: 500
  },
  paperTitle: {
    fontFamily: 'montserrat',
    fontSize: '18px',
    fontWeight: 600,
    margin: 0,
    marginBottom: '32px'
  },
  paper: {
    padding: '24px 24px',
    margin: '0'
  }
}))

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) {
    context.res.statusCode = 302
    context.res.setHeader('Location', '/auth/signin')
  }

  if (session?.user && !isIT(session?.user)) {
    context.res.statusCode = 302
    context.res.setHeader('Location', '/')
  }

  return { props: {} }
}
