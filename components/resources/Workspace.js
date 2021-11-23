import React, { useState, useEffect } from 'react'
import * as dayjs from 'dayjs'
import 'dayjs/locale/ca'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import { useRouter } from 'next/router'

import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import { useTheme } from '@mui/styles'

import { getEvents } from '@lib/resources'
import { useSnackbar } from 'notistack'

import DayMonthHeader from 'components/resources/DayMonthHeader'

import JunglaCristal from 'components/resources/workspaces/JunglaCristal'
import Balneari from 'components/resources/workspaces/Balneari'
import Txernobil from 'components/resources/workspaces/Txernobil'

dayjs.extend(customParseFormat)
dayjs.locale('ca')

const Workspace = ({ resources, events, token, buildingId, initialDate }) => {
  const theme = useTheme()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const newDate = initialDate ? dayjs(initialDate, 'DD-MM-YYYY', 'ca') : dayjs()

  const [refDate, setDate] = useState(newDate.hour(0).minute(0).second(0))
  const [resourcesMap] = useState(resources)
  const [eventsMap, setEventsMap] = useState(events)
  const [isLoading, setIsLoading] = useState(false)

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

  const reloadResources = async () => {
    await getAsyncEvents()
  }

  const getAsyncEvents = async () => {
    setIsLoading(true)
    const events = {}
    for (const item of Object.values(resourcesMap)) {
      events[item.resourceName] = getEvents(
        token,
        item?.resourceEmail,
        refDate.toISOString(),
        refDate.add(1, 'day').toISOString()
      )
    }

    Promise.all(Object.values(events))
      .then((values) => {
        let index = 0
        let errors = 0
        for (const item of Object.values(resourcesMap)) {
          events[item.resourceName] = values[index]
          if (values[index] instanceof Error) {
            errors++
          }
          index++
        }
        if (errors) {
          enqueueSnackbar(
            'Has superat el límit de peticions per minut! Espera uns segons...',
            {
              variant: 'error',
              autoHideDuration: 30000
            }
          )
          errors = 0
        }
        setEventsMap(events)
        setIsLoading(false)
      })
      .catch((reason) => {
        console.log('promise all')
        console.log(reason)
      })
  }

  useEffect(() => {
    getAsyncEvents()
  }, [refDate])

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
            sx={{ marginTop: theme.spacing(1), padding: theme.spacing(4) }}>
            {buildingId === 'MONTURIOL' && (
              <JunglaCristal
                resources={resourcesMap}
                events={eventsMap}
                isLoading={isLoading}
                token={token}
                reloadResources={reloadResources}
                date={refDate}
              />
            )}

            {buildingId === 'GIROEMPREN' && (
              <Balneari
                resources={resourcesMap}
                events={eventsMap}
                isLoading={isLoading}
                token={token}
                reloadResources={reloadResources}
                date={refDate}
              />
            )}

            {buildingId === 'TXERNOBIL' && (
              <Txernobil
                resources={resourcesMap}
                events={eventsMap}
                isLoading={isLoading}
                token={token}
                reloadResources={reloadResources}
                date={refDate}
              />
            )}

            {!['MONTURIOL', 'GIROEMPREN', 'TXERNOBIL'].includes(buildingId) && (
              <h3
                sx={{
                  fontSize: '16px',
                  textTransform: 'uppercase',
                  margin: '24px 0'
                }}>
                Espai pendent de mapejar
              </h3>
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default Workspace
