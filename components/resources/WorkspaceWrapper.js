import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'

import * as dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import 'dayjs/locale/ca'

import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import CircularProgress from '@mui/material/CircularProgress'

import { insertEvent, deleteEvent } from '@lib/resources'

import { useSnackbar } from 'notistack'

import Box from '@mui/material/Box'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'

import DatePicker from '@mui/lab/DatePicker'

import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined'
import { Select } from '@mui/material'
import { isRRHH } from '@lib/utils'

dayjs.extend(isoWeek)

const WorkspaceWrapper = (props) => {
  const {
    children,
    selectedResource = false,
    selectedEvent = false,
    closeDialogFb = () => {},
    reloadResources,
    date,
    name,
    place
  } = props

  // const theme = useTheme()
  const [session] = useSession()
  const { enqueueSnackbar } = useSnackbar()

  const maxDate = dayjs().endOf('year').toDate()

  const [event, setEvent] = useState({
    resourceId: selectedResource?.id,
    startDate: dayjs(date).startOf('day'),
    endDate: dayjs(date).endOf('day'),
    description: session?.user?.name,
    period: 0,
    userId: session?.user?.email
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(false)
    setEvent({ ...event, resourceId: selectedResource?.id })
  }, [selectedResource])

  useEffect(() => {
    if (selectedEvent) {
      console.log('selected', selectedEvent)
      setEvent({
        ...event,
        description: selectedEvent?.summary,
        userId: selectedEvent?.userId
      })
    }
  }, [selectedEvent])

  useEffect(() => {
    setEvent({
      ...event,
      startDate: dayjs(date).startOf('day'),
      endDate: dayjs(date).endOf('day')
    })
  }, [date])

  const handleSubmit = () => {
    setLoading(true)
    insertEvent(event)
      .then((response) => {
        reloadResources()
        enqueueSnackbar('Reserva finalitzada correctament!', {
          variant: 'success'
        })
        closeDialogFb()
        return response
      })
      .catch((error) => {
        console.log(error)
        enqueueSnackbar("No s'ha pogut finalitzar la reserva...", {
          variant: 'error'
        })
      })
      .finally(() => {
        setLoading(false)
        closeDialogFb()
      })
  }

  const handleDelete = () => {
    setLoading(true)
    deleteEvent(selectedResource?.id, selectedEvent?.id)
      .then((response) => {
        reloadResources()
        enqueueSnackbar('Reserva esborrada correctament!', {
          variant: 'success'
        })
        return response
      })
      .catch((error) => {
        console.log(error)
        if (error?.response?.data?.error?.message || error?.message) {
          enqueueSnackbar(
            error?.response?.data?.error.message || error.message,
            {
              variant: 'error'
            }
          )
        } else {
          enqueueSnackbar('Sembla que hi ha problemes...', {
            variant: 'error'
          })
        }
      })
      .finally(() => {
        setLoading(false)
        closeDialogFb()
      })
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {children}
      <Dialog open={!!selectedResource} onClose={closeDialogFb} maxWidth="md">
        <DialogTitle>
          <Box variant="span" sx={{ display: 'flex', alignItems: 'center' }}>
            <EventAvailableOutlinedIcon /> &nbsp;{'Reserva '}
            {selectedResource?.name}
          </Box>
        </DialogTitle>
        <DialogContent dividers={true}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '1rem',
                  marginBottom: '8px'
                }}>
                <ApartmentOutlinedIcon
                  sx={{ color: 'rgba(0, 0, 0, 0.54)' }}
                  fontSize="small"
                />
                &nbsp;{place}
                &nbsp;&nbsp;
                <PlaceOutlinedIcon
                  sx={{ color: 'rgba(0, 0, 0, 0.54)' }}
                  fontSize="small"
                />
                &nbsp;{name}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                disabled={!!selectedEvent}
                label="Descripció"
                variant="outlined"
                value={event.description}
                onChange={(inputEvent) =>
                  setEvent({ ...event, description: inputEvent.target.value })
                }
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <DatePicker
                label="Data d'inici"
                value={event?.startDate}
                disabled={!!selectedEvent}
                inputFormat="dd/MM/yyyy"
                variant="inline"
                minDate={new Date()}
                maxDate={maxDate}
                onChange={(date) =>
                  setEvent({
                    ...event,
                    startDate: dayjs(date).startOf('day'),
                    period: 0
                  })
                }
                renderInput={(params) => (
                  <TextField variant="outlined" fullWidth {...params} />
                )}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <DatePicker
                label="Data de fi"
                value={event?.endDate}
                disabled={!!selectedEvent}
                inputFormat="dd/MM/yyyy"
                variant="inline"
                onChange={(date) =>
                  setEvent({
                    ...event,
                    endDate: dayjs(date).endOf('day'),
                    period: 0
                  })
                }
                minDate={dayjs(event.startDate).toDate()}
                maxDate={maxDate}
                renderInput={(params) => (
                  <TextField variant="outlined" fullWidth {...params} />
                )}
              />
            </Grid>
            {dayjs(event.endDate).diff(event.startDate, 'd') >= 6 && (
              <Grid item xs={12}>
                <Select
                  fullWidth
                  label="Periodicitat"
                  disabled={!!selectedEvent}
                  value={event?.period}
                  onChange={(inputEvent) => {
                    setEvent({ ...event, period: inputEvent.target.value })
                  }}>
                  <MenuItem value={0}>Cada dia</MenuItem>
                  {[...new Array(5).keys()].map((weekday) => (
                    <MenuItem key={weekday} value={weekday + 1}>
                      Tots els{' '}
                      {dayjs()
                        .isoWeekday(weekday + 1)
                        .format('dddd')}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Usuari"
                variant="outlined"
                disabled={!!selectedEvent || !isRRHH(session?.user)}
                value={event.userId}
                onChange={(inputEvent) => {
                  setEvent({ ...event, userId: inputEvent.target.value })
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              closeDialogFb()
            }}
            sx={{ marginTop: '4px', marginBottom: '4px', color: '#fff' }}
            color="secondary"
            variant="contained"
            disableElevation>
            Cancel·la
          </Button>
          {!!selectedEvent ? (
            <Button
              onClick={handleDelete}
              sx={{ marginTop: '4px', marginBottom: '4px', color: '#fff' }}
              color="error"
              variant="contained"
              startIcon={
                loading ? (
                  <CircularProgress size={16} thickness={6} color="inherit" />
                ) : (
                  <DeleteIcon />
                )
              }
              disableElevation>
              Esborra
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              sx={{ marginTop: '4px', marginBottom: '4px', color: '#fff' }}
              color="primary"
              variant="contained"
              startIcon={
                loading ? (
                  <CircularProgress size={16} thickness={6} color="inherit" />
                ) : (
                  <SendIcon />
                )
              }
              disableElevation>
              Accepta
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default WorkspaceWrapper
