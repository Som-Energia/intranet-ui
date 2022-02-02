import { useEffect } from 'react'
import useSWR from 'swr'

import Head from 'next/head'
import { getSession } from 'next-auth/client'

import { Box, Container, Typography, CircularProgress } from '@mui/material'
import { useTheme } from '@mui/styles'

import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'

import Breadcrumbs from 'components/layout/Breadcrumbs'
import Workspace from 'components/resources/Workspace'

import { getResources } from 'lib/resources'
import { fetcher } from 'lib/utils'

require('typeface-montserrat')

export default function ResourcePage({ workspaceId, date }) {
  const theme = useTheme()

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/resources/workspace/${workspaceId}`,
    fetcher
  )

  if (!data) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh'
        }}>
        <CircularProgress size={80} />
      </Box>
    )
  }

  return (
    <>
      <Head>
        <title>Reserva d&apos;espais | Som Energia</title>
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
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'Montserrat',
              fontSize: '1.5rem',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              whiteSpace: 'nowrap'
            }}>
            <PlaceOutlinedIcon />
            &nbsp;
            {data?.name}
          </Typography>
          <Breadcrumbs />
        </Box>
        <Box sx={{ paddingTop: '24px' }}>
          <Workspace {...data} workspaceId={workspaceId} initialDate={date} />
        </Box>
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

  const { workspaceId, date = false } = context.query
  const numWorkspaceId = workspaceId.replace(/-.*/, '')

  return {
    props: {
      workspaceId: numWorkspaceId,
      date: date
    }
  }
}
