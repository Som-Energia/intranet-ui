import { useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSession, getSession, signIn } from 'next-auth/client'

import { welcomeMessage } from '@/lib/utils'

import { Container, Typography, Paper, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const menuItems = [
  { title: "Reserva d'espais", path: '/resources', icon: 'absencies' }
]

export default function Home() {
  const classes = useStyles()
  const router = useRouter()

  const [session, loading] = useSession()

  useEffect(() => {
    if (!loading && !session) signIn()
  })

  return (
    <>
      <Head>
        <title>Intranet | Som Energia</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container className={classes.container}>
        {session && (
          <Typography variant="h5" className={classes.title}>
            {`${welcomeMessage()} ${session.user?.name}`},
          </Typography>
        )}
        <Typography variant="h5" className={classes.subtitle}>
          Ets a l&apos;espai virtual de l&apos;ET
        </Typography>
        <Grid className={classes.mainGrid} container spacing={5}>
          {menuItems.map(({ title, path, icon }) => (
            <Grid item key={path} className={classes.itemGrid}>
              <Paper
                className={classes.itemIcon}
                elevation={0}
                onClick={() => router.push(path)}>
                <Image src={`/icons/${icon}.svg`} width={70} height={70} />
              </Paper>
              <Typography variant="h6" className={classes.itemTitle}>
                {title}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4)
  },
  title: {
    fontWeight: 500
  },
  subtitle: {
    marginTop: theme.spacing(1),
    fontSize: '1.25rem'
  },
  mainGrid: {
    marginTop: theme.spacing(1)
  },
  itemGrid: {
    minWidth: '180px'
  },
  itemIcon: {
    cursor: 'pointer',
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    height: '160px',
    minWidth: '160px',
    borderRadius: '36px',
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    }
  },
  itemTitle: {
    textAlign: 'center',
    marginTop: theme.spacing(2),
    fontWeight: 500,
    fontSize: '1rem',
    height: '60px'
  }
}))

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) {
    context.res.statusCode = 302
    context.res.setHeader('Location', '/auth/signin')
  }
  return { props: {} }
}
