import React, { useState } from 'react'
import * as dayjs from 'dayjs'
import 'dayjs/locale/ca'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import useSWR from 'swr'

import { useRouter } from 'next/router'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import { useTheme } from '@mui/styles'
import { fetcher } from 'lib/utils'

import DayMonthHeader from 'components/resources/DayMonthHeader'
import JunglaCristal from 'components/resources/workspaces/JunglaCristal'
import Balneari from 'components/resources/workspaces/Balneari'
import Txernobil from 'components/resources/workspaces/Txernobil'

dayjs.extend(customParseFormat)
dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.locale('ca')
dayjs.tz.setDefault('Europe/Madrid')

const Workspace = (props) => {
  const { workspaceId, buildingId, initialDate, name, place } = props

  const theme = useTheme()
  const router = useRouter()

  const newDate = initialDate
    ? dayjs(initialDate, 'DD-MM-YYYY', 'ca').startOf('day')
    : dayjs().startOf('day')

  const [refDate, setDate] = useState(newDate)

  const { data, error, mutate } = useSWR(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/resources/workspace/events/${workspaceId}?timeMax=${refDate
      .add(1, 'day')
      .toISOString()}&timeMin=${refDate.toISOString()}`,
    fetcher
  )

  const nextDay = () => {
    const newDate = refDate.add(1, 'day')
    setDate(newDate)
    router.push({
      pathname: router.pathname,
      query: { ...router.query, date: dayjs(newDate).format('DD-MM-YYYY') }
    })
  }

  const prevDay = () => {
    const newDate = refDate.subtract(1, 'day')
    setDate(newDate)
    router.push({
      pathname: router.pathname,
      query: { ...router.query, date: dayjs(newDate).format('DD-MM-YYYY') }
    })
  }

  const handleDate = (newDate) => {
    setDate(newDate)
    router.push({
      pathname: router.pathname,
      query: { ...router.query, date: dayjs(newDate).format('DD-MM-YYYY') }
    })
  }

  const workspaceProps = {
    name: name,
    place: place,
    resources: data,
    isLoading: !error && !data,
    reloadResources: mutate,
    date: refDate
  }

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <DayMonthHeader
            date={refDate}
            handlePrev={prevDay}
            handleNext={nextDay}
            handlePicker={handleDate}
          />
        </Grid>
        <Grid item xs={12}>
          <Paper
            elevation={0}
            sx={{
              marginTop: theme.spacing(1),
              padding: theme.spacing(4),
              width: 'auto',
              overflowX: 'scroll'
            }}>
            <Box sx={{ minWidth: '850px' }}>
              {buildingId === 'MONTURIOL' && (
                <JunglaCristal {...workspaceProps} />
              )}

              {buildingId === 'GIROEMPREN' && <Balneari {...workspaceProps} />}

              {buildingId === 'TXERNOBIL' && <Txernobil {...workspaceProps} />}

              {!['MONTURIOL', 'GIROEMPREN', 'TXERNOBIL'].includes(
                buildingId
              ) && (
                <h3
                  sx={{
                    fontSize: '16px',
                    textTransform: 'uppercase',
                    margin: '24px 0'
                  }}>
                  Espai pendent de mapejar
                </h3>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default Workspace
