import React, { useEffect } from 'react'
import { providers, signIn } from 'next-auth/client'

import Image from 'next/image'
import { useRouter } from 'next/router'

import { Formik } from 'formik'
import * as Yup from 'yup'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import GoogleIcon from 'components/layout/icons/GoogleIcon'

import { useTheme } from '@mui/styles'

export default function SignIn({ providers }) {
  const theme = useTheme()
  const router = useRouter()

  const login = () => {}

  const isAuthenticated = false
  const isError = false

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  const doLogin = (username, password) => {
    return login(username, password)
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
      <Container component="main" maxWidth="xs">
        <div>
          <Box
            sx={{
              backgroundColor: '#fff',
              padding: theme.spacing(4),
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <Box
              sx={{
                marginBottom: theme.spacing(1)
              }}>
              <Image src="/cuca.png" layout="fixed" width={100} height={60} />
            </Box>
            <Typography component="h1" variant="h5">
              Inicia sessió per continuar
            </Typography>
            <Box
              sx={{
                marginTop: '16px',
                width: '100%'
              }}>
              <Divider sx={{ marginBottom: theme.spacing(3) }} />
              {Object.values(providers).map((provider) => (
                <Button
                  key={provider.name}
                  fullWidth
                  variant="contained"
                  sx={{ color: '#fff' }}
                  disableElevation
                  startIcon={<GoogleIcon />}
                  onClick={() => signIn(provider.id)}>
                  Entrar amb {provider.name}
                </Button>
              ))}
            </Box>
          </Box>
        </div>
      </Container>
    </Box>
  )
}

SignIn.getInitialProps = async (context) => {
  return {
    providers: await providers(context)
  }
}
