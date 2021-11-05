import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'

import * as dayjs from 'dayjs'
import 'dayjs/locale/ca'

import { useTheme } from '@mui/styles'
import { resources, insertEvent } from '@lib/resources'
import { slugify } from '@lib/utils'

import { useSnackbar } from 'notistack'

import Box from '@mui/material/Box'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'

import DatePicker from '@mui/lab/DatePicker'

import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined'

const WorkspaceWrapper = (props) => {
  const {
    children,
    selectedResource = false,
    closeDialogFb = () => {},
    reloadResources,
    date,
    token
  } = props

  const theme = useTheme()
  const [session, loading] = useSession()
  const [building, setBuilding] = useState()
  const { enqueueSnackbar } = useSnackbar()

  const [event, setEvent] = useState({
    startDate: date,
    endDate: date,
    description: session?.user?.name
  })

  console.log(event)

  useEffect(() => {
    setEvent({ ...event, startDate: date, endDate: date })
  }, [date])

  const handleSubmit = () => {
    insertEvent(
      token,
      selectedResource?.resourceEmail,
      dayjs(event?.startDate).hour(0).minute(0).second(0).toISOString(),
      dayjs(event?.endDate).hour(23).minute(59).second(59).toISOString(),
      event?.description
    )
      .then((response) => {
        console.log(response)
        reloadResources()
        enqueueSnackbar('Reserva finalitzada correctament!', {
          variant: 'success'
        })
        return response
      })
      .catch((error) => {
        console.log('error!')
        console.log(error.response)
        if (error?.response?.data?.error?.message) {
          enqueueSnackbar(error.response.data.error.message, {
            variant: 'error'
          })
        } else {
          enqueueSnackbar('Sembla que hi ha problemes...', {
            variant: 'error'
          })
        }
      })
    closeDialogFb()
  }

  useEffect(() => {
    const filteredResource = resources.find(
      (resource) =>
        resource.buildingId ===
        slugify(selectedResource.buildingId).toUpperCase()
    )
    setBuilding(filteredResource)
  }, [selectedResource])

  return (
    <Box sx={{ display: 'flex' }}>
      {children}
      <Dialog open={!!selectedResource} onClose={closeDialogFb} maxWidth="md">
        <DialogTitle>
          <Box variant="span" sx={{ display: 'flex', alignItems: 'center' }}>
            <EventAvailableOutlinedIcon /> &nbsp;{'Reserva '}
            {selectedResource?.resourceName}
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
                &nbsp;{building?.place}
                &nbsp;&nbsp;
                <PlaceOutlinedIcon
                  sx={{ color: 'rgba(0, 0, 0, 0.54)' }}
                  fontSize="small"
                />
                &nbsp;{building?.name}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descripció"
                variant="outlined"
                value={event.description}
              />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                label="Data d'inici"
                value={event?.startDate}
                inputFormat="dd/MM/yyyy"
                variant="inline"
                minDate={new Date()}
                onChange={(date) => setEvent({ ...event, startDate: date })}
                renderInput={(params) => (
                  <TextField variant="outlined" fullWidth {...params} />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <DatePicker
                label="Data de fi"
                value={event?.endDate}
                inputFormat="dd/MM/yyyy"
                variant="inline"
                onChange={(date) => setEvent({ ...event, endDate: date })}
                minDate={dayjs(event.startDate).toDate()}
                renderInput={(params) => (
                  <TextField variant="outlined" fullWidth {...params} />
                )}
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
          <Button
            onClick={handleSubmit}
            sx={{ marginTop: '4px', marginBottom: '4px', color: '#fff' }}
            color="primary"
            variant="contained"
            disableElevation>
            Accepta
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default WorkspaceWrapper
