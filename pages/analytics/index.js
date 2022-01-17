import { useEffect, useState } from 'react'
import Head from 'next/head'
import Breadcrumbs from '@components/layout/Breadcrumbs'
import { signIn, useSession, getSession } from 'next-auth/client'

import { useTheme } from '@mui/styles'

import { Box, Container, Typography, Paper, Grid } from '@mui/material'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import { getRemoteData, getLastDays } from '@lib/analytics'
import { isIT } from '@lib/utils'

import BarChartIcon from '@mui/icons-material/BarChart'
import AnalyticsBarChart from '@components/analytics/BarChart'

import * as dayjs from 'dayjs'
import 'dayjs/locale/ca'

require('typeface-montserrat')

const tabs = [
  { label: 'Setmanal', value: 7 },
  { label: 'Quinzenal', value: 15 },
  { label: 'Mensual', value: 30 },
  { label: 'Trimestral', value: 90 },
  { label: 'Anual', value: 365 }
]

export default function WebformsAnalytics() {
  dayjs.locale('ca')
  const theme = useTheme()

  const [session, loading] = useSession()
  const [clientSide, setClientSide] = useState(false)
  const [data, setData] = useState([])
  const [selectedTab, setSelectedTab] = useState(0)
  const [numDays, setNumDays] = useState(7)

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

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue)
    setNumDays(tabs[newValue].value)
  }

  return (
    <>
      <Head>
        <title>Webforms Analytics | Som Energia</title>
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
          {' '}
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'Montserrat',
              fontSize: '1.5rem',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center'
            }}>
            <BarChartIcon fontSize="large" sx={{ marginRight: '4px' }} />{' '}
            Webforms Analytics
          </Typography>
          <Breadcrumbs />
        </Box>
        <div suppressHydrationWarning={true}>
          <Box
            sx={{
              paddingTop: theme.spacing(2),
              borderBottom: 1,
              borderColor: 'divider'
            }}>
            <Tabs
              value={selectedTab}
              onChange={handleChange}
              aria-label="basic tabs example">
              {tabs.length > 0 &&
                tabs.map(({ label, value }) => (
                  <Tab key={value} label={label} />
                ))}
            </Tabs>
          </Box>
          {process.browser && (
            <Grid container spacing={3} sx={{ marginTop: '0px' }}>
              <Grid item xs={12} sm={6}>
                <Paper elevation={0} sx={{ padding: '24px 24px', margin: '0' }}>
                  <Box
                    variant="h3"
                    sx={{
                      fontFamily: 'montserrat',
                      fontSize: '18px',
                      fontWeight: 600,
                      margin: 0,
                      marginBottom: '32px'
                    }}>
                    Contractacions darrers {numDays} dies
                  </Box>
                  <AnalyticsBarChart
                    data={getLastDays(data, numDays)}
                    mainValue="contracts_success"
                    secondaryValue="contracts_fail"
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper elevation={0} sx={{ padding: '24px 24px', margin: '0' }}>
                  <Box
                    variant="h3"
                    sx={{
                      fontFamily: 'montserrat',
                      fontSize: '18px',
                      fontWeight: 600,
                      margin: 0,
                      marginBottom: '32px'
                    }}>
                    Altes de socia darrers {numDays} dies
                  </Box>
                  <AnalyticsBarChart
                    data={getLastDays(data, numDays)}
                    mainValue="members_success"
                    secondaryValue="members_fail"
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper elevation={0} sx={{ padding: '24px 24px', margin: '0' }}>
                  <Box
                    variant="h3"
                    sx={{
                      fontFamily: 'montserrat',
                      fontSize: '18px',
                      fontWeight: 600,
                      margin: 0,
                      marginBottom: '32px'
                    }}>
                    Canvis de titular darrers {numDays} dies
                  </Box>
                  <AnalyticsBarChart
                    data={getLastDays(data, numDays)}
                    mainValue="holderchanges_success"
                    secondaryValue="holderchanges_fail"
                  />
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Paper elevation={0} sx={{ padding: '24px 24px', margin: '0' }}>
                  <Box
                    variant="h3"
                    sx={{
                      fontFamily: 'montserrat',
                      fontSize: '18px',
                      fontWeight: 600,
                      margin: 0,
                      marginBottom: '32px'
                    }}>
                    Modificacions contractuals darrers {numDays} dies
                  </Box>
                  <AnalyticsBarChart
                    data={getLastDays(data, numDays)}
                    mainValue="modification_success"
                    secondaryValue="modification_fail"
                  />
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Paper elevation={0} sx={{ padding: '24px 24px', margin: '0' }}>
                  <Box
                    variant="h3"
                    sx={{
                      fontFamily: 'montserrat',
                      fontSize: '18px',
                      fontWeight: 600,
                      margin: 0,
                      marginBottom: '32px'
                    }}>
                    Aportacions darrers {numDays} dies
                  </Box>
                  <AnalyticsBarChart
                    data={getLastDays(data, numDays)}
                    mainValue="apos_success"
                    secondaryValue="apos_fail"
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

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) {
    context.res.statusCode = 302
    context.res.setHeader('Location', '/auth/signin')
  }

  /*
  if (session?.user && !isIT(session?.user)) {
    context.res.statusCode = 302
    context.res.setHeader('Location', '/')
  }
  */

  return { props: {} }
}
