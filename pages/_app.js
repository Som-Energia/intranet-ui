import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'

import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'

import { CacheProvider } from '@emotion/react'
import { Provider } from 'next-auth/client'
import { SnackbarProvider } from 'notistack'

import { ThemeProvider } from '@mui/material/styles'

import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

import theme from '@styles/theme'
import createEmotionCache from '@styles/createEmotionCache'

import Header from '@components/layout/Header'
import Footer from '@components/layout/Footer'

const clientSideEmotionCache = createEmotionCache()
export default function App(props) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props

  /*
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, []) */

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Intranet | Som Energia</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          <Provider
            session={pageProps.session}
            options={{
              clientMaxAge: 300,
              keepAlive: 5 * 60
            }}>
            <SnackbarProvider maxSnack={3}>
              <Box
                component="div"
                sx={{
                  flexGrow: 1,
                  backgroundColor: '#f2f2f2',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'between',
                  minHeight: '100vh'
                }}>
                <Header />
                <Box
                  component="main"
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                  <Component {...pageProps} />
                </Box>
                <Footer />
              </Box>
            </SnackbarProvider>
          </Provider>
        </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
}
