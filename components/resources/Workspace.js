import React, { useState, useEffect } from 'react'
import * as dayjs from 'dayjs'
import 'dayjs/locale/ca'

import { useRouter } from 'next/router'

import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import { useTheme } from '@mui/styles'

import { getEvents } from '@lib/resources'

import DayMonthHeader from 'components/resources/DayMonthHeader'

import JunglaCristal from 'components/resources/workspaces/JunglaCristal'
import Balneari from 'components/resources/workspaces/Balneari'
import Txernobil from 'components/resources/workspaces/Txernobil'

const Workspace = ({ resources, events, token, buildingId, initialDate }) => {
  const theme = useTheme()
  const router = useRouter()
  dayjs.locale('ca')

  const [date, setDate] = useState(
    dayjs(initialDate || undefined)
      .hour(0)
      .minute(0)
      .second(0)
  )
  const [resourcesMap] = useState(resources)
  const [eventsMap, setEventsMap] = useState(events)
  const [isLoading, setIsLoading] = useState(false)

  const nextDay = () => {
    setDate(date.add(1, 'day'))
    router.push({
      pathname: router.pathname,
      query: { ...router.query, date: dayjs(date).format('DD-MM-YYYY') }
    })
  }

  const prevDay = () => {
    setDate(date.subtract(1, 'day'))
    router.push({
      pathname: router.pathname,
      query: { ...router.query, date: dayjs(date).format('DD-MM-YYYY') }
    })
  }

  const handleDate = (date) => {
    setDate(date)
    router.push({
      pathname: router.pathname,
      query: { ...router.query, date: dayjs(date).format('DD-MM-YYYY') }
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
        date.toISOString(),
        date.add(1, 'day').toISOString()
      )
    }

    Promise.all(Object.values(events))
      .then((values) => {
        let index = 0
        for (const item of Object.values(resourcesMap)) {
          events[item.resourceName] = values[index]
          index++
        }
        setEventsMap(events)
        setIsLoading(false)
      })
      .catch((reason) => {
        console.log(reason)
      })
  }

  useEffect(() => {
    getAsyncEvents()
  }, [date])

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <DayMonthHeader
            date={date}
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
                date={date}
              />
            )}

            {buildingId === 'GIROEMPREN' && (
              <Balneari
                resources={resourcesMap}
                events={eventsMap}
                isLoading={isLoading}
                token={token}
                reloadResources={reloadResources}
                date={date}
              />
            )}

            {buildingId === 'TXERNOBIL' && (
              <Txernobil
                resources={resourcesMap}
                events={eventsMap}
                isLoading={isLoading}
                token={token}
                reloadResources={reloadResources}
                date={date}
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
