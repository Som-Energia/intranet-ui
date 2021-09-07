import React, { useEffect } from 'react'
import { providers, signIn } from 'next-auth/client'

import Image from 'next/image'
import { useRouter } from 'next/router'

import { Formik } from 'formik'
import * as Yup from 'yup'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

import GoogleIcon from 'components/layout/icons/GoogleIcon'

import { makeStyles } from '@material-ui/core'

export default function SignIn({ providers }) {
  const classes = useStyles()
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
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <div className={classes.paperWrapper}>
          <div className={classes.paper}>
            <div className={classes.logoContainer}>
              <Image src="/cuca.png" layout="fixed" width={100} height={60} />
            </div>
            <Typography component="h1" variant="h5">
              Inicia sessió per continuar
            </Typography>
            <div className={classes.providersWrapper}>
              <Divider />
              {Object.values(providers).map((provider) => (
                <Button
                  key={provider.name}
                  fullWidth
                  variant="contained"
                  disableElevation
                  startIcon={<GoogleIcon />}
                  onClick={() => signIn(provider.id)}>
                  Entrar amb {provider.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

SignIn.getInitialProps = async (context) => {
  return {
    providers: await providers(context)
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  paper: {
    backgroundColor: '#fff',
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  links: {
    fontWeight: 500
  },
  submit: {
    color: '#fff',
    fontSize: '1rem',
    margin: theme.spacing(2, 0, 1)
  },
  logoContainer: {
    marginBottom: theme.spacing(1)
  },
  providersWrapper: {
    marginTop: '16px',
    width: '100%',
    '& hr': {
      marginBottom: theme.spacing(3)
    }
  }
}))
