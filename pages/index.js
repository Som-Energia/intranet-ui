import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSession, getSession } from 'next-auth/client'

import { welcomeMessage } from '@lib/utils'

import { Container, Typography, Paper, Grid } from '@mui/material'
import { useTheme } from '@mui/styles'

const menuItems = [
  { title: "Reserva d'espais", path: '/workspaces', icon: 'absencies' },
  { title: 'Webforms analytics', path: '/analytics', icon: 'analytics' },
  {
    title: 'Incidències i consultes',
    path: '/incidences',
    icon: 'incidencies'
  }
]

export default function Home() {
  const theme = useTheme()
  const router = useRouter()
  const [session, loading] = useSession()

  return (
    <>
      <Head>
        <title>Intranet | Som Energia</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container sx={{ padding: theme.spacing(4) }}>
        {session && (
          <Typography variant="h3" sx={{ fontSize: '1.5rem', fontWeight: 500 }}>
            {`${welcomeMessage()} ${session.user?.name}`},
          </Typography>
        )}
        <Typography
          variant="h5"
          sx={{ marginTop: theme.spacing(1), fontSize: '1.25rem' }}>
          Ets a la intranet de l&apos;ET de Som Energia
        </Typography>
        <Grid container spacing={5} sx={{ marginTop: theme.spacing(1) }}>
          {menuItems.map(({ title, path, icon }) => (
            <Grid item key={path} xs={6} md={2}>
              <Paper
                sx={{
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
                  },
                  '&:hover img': {
                    filter: 'invert(1)'
                  }
                }}
                elevation={0}
                onClick={() => router.push(path)}>
                <Image src={`/icons/${icon}.svg`} width={70} height={70} />
              </Paper>
              <Typography
                variant="h6"
                sx={{
                  textAlign: 'center',
                  marginTop: theme.spacing(2),
                  fontWeight: 500,
                  fontSize: '1rem',
                  height: '60px'
                }}>
                {title}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false
      }
    }
  }
  return { props: {} }
}
