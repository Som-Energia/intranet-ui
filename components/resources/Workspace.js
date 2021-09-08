import React, { useState, useEffect } from 'react'
import * as dayjs from 'dayjs'
import 'dayjs/locale/ca'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import { makeStyles } from '@material-ui/core/styles'

import { getEvents } from '@/lib/resources'

import DayMonthHeader from 'components/resources/DayMonthHeader'

import JunglaCristal from 'components/resources/workspaces/JunglaCristal'
import Balneari from 'components/resources/workspaces/Balneari'
import Casademont from 'components/resources/workspaces/Casademont'

const Workspace = ({ resources, events, token, buildingId }) => {
  const classes = useStyles()
  dayjs.locale('ca')

  const [date, setDate] = useState(dayjs())
  const [resourcesMap, setResourcesMap] = useState(resources)
  const [eventsMap, setEventsMap] = useState(events)
  const [isLoading, setIsLoading] = useState(false)

  const nextDay = () => {
    setDate(date.add(1, 'day'))
  }

  const prevDay = () => {
    setDate(date.subtract(1, 'day'))
  }

  useEffect(() => {
    const getAsyncEvents = async () => {
      setIsLoading(true)
      const events = {}
      for (const item of Object.values(resourcesMap)) {
        events[item.resourceName] = await getEvents(
          token,
          item?.resourceEmail,
          date.toISOString(),
          date.add(1, 'day').toISOString()
        )
      }
      console.log(events)
      setEventsMap(events)
      setIsLoading(false)
    }
    getAsyncEvents()
  }, [date])

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <DayMonthHeader
            date={date.format('dddd, DD/MM/YYYY')}
            handlePrev={prevDay}
            handleNext={nextDay}
          />
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={0}>
            {buildingId === 'MONTURIOL' && (
              <JunglaCristal
                resources={resourcesMap}
                events={eventsMap}
                isLoading={isLoading}
                token={token}
              />
            )}

            {buildingId === 'GIROEMPREN' && (
              <Balneari
                resources={resourcesMap}
                events={eventsMap}
                isLoading={isLoading}
                token={token}
              />
            )}

            {buildingId === 'CASADEMONT' && (
              <Casademont
                resources={resourcesMap}
                events={eventsMap}
                isLoading={isLoading}
                token={token}
              />
            )}

            {!['MONTURIOL', 'GIROEMPREN', 'CASADEMONT'].includes(
              buildingId
            ) && (
              <h3 className={classes.emptyContent}>Espai pendent de mapejar</h3>
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default Workspace

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(4)
  },
  noMarginTop: {
    marginTop: 0
  },
  contentItem: {
    padding: '16px 0 16px 16px',
    '&:last-child': {
      paddingBottom: '16px'
    }
  },
  yearContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '16px',
    '& h1': {
      fontSize: '36px'
    }
  },
  resum: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  resumItem: {
    textAlign: 'center',
    flexGrow: 1
  },
  super: {
    fontSize: '30px'
  },
  superDesc: {
    fontSize: '14px',
    letterSpacing: '1px',
    textTransform: 'uppercase'
  },
  emptyContent: {
    fontSize: '16px',
    textTransform: 'uppercase',
    margin: '24px 0'
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}))
