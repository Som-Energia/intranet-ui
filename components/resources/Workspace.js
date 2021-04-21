import React, { useState, useEffect } from 'react'
import * as dayjs from 'dayjs'
import 'dayjs/locale/ca'

import clsx from 'clsx'
import useSWR from 'swr'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Skeleton from '@material-ui/lab/Skeleton'
import Fade from '@material-ui/core/Fade'

import { makeStyles } from '@material-ui/core/styles'

import { fetchWithToken } from '@/lib/utils'
import { getEvents } from '@/lib/resources'

import DayMonthHeader from 'components/resources/DayMonthHeader'
import JunglaCristal from 'components/resources/workspaces/JunglaCristal'

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
      setEventsMap(events)
      setIsLoading(false)
    }
    getAsyncEvents()
  }, [date])

  // const token = null
  /*
  const { data, isValidating: loading, error } = useSWR(
    [`${process.env.NEXT_PUBLIC_API_URL}/absencies/absences`, token],
    fetchWithToken
  )
  */

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
            <JunglaCristal
              resources={resourcesMap}
              events={eventsMap}
              isLoading={isLoading}
            />
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
    padding: theme.spacing(3)
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
