import { DialogTitle } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSession } from 'next-auth/client'

import * as dayjs from 'dayjs'
import 'dayjs/locale/ca'

import { makeStyles } from '@material-ui/core/styles'
import { resources, insertEvent } from '@/lib/resources'
import { slugify } from '@/lib/utils'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'

import { DatePicker } from '@material-ui/pickers'

import ApartmentOutlinedIcon from '@material-ui/icons/ApartmentOutlined'
import PlaceOutlinedIcon from '@material-ui/icons/PlaceOutlined'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined'

const WorkspaceWrapper = (props) => {
  const {
    children,
    selectedResource = false,
    closeDialogFb = {},
    token
  } = props
  const classes = useStyles()
  const [session, loading] = useSession()
  const [building, setBuilding] = useState()

  const [event, setEvent] = useState({
    startDate: new Date(),
    endDate: new Date(),
    description: session?.user?.name
  })

  const handleSubmit = () => {
    console.log(selectedResource)
    console.log(event)
    console.log(token)
    insertEvent(
      token,
      selectedResource?.resourceEmail,
      dayjs(event?.startDate).toISOString(),
      dayjs(event?.endDate).toISOString(),
      event?.description
    ).then(response => console.log(response))
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
    <Workspace>
      {children}
      <Dialog open={!!selectedResource} onClose={closeDialogFb} maxWidth="md">
        <DialogTitle>
          <Title>
            <EventAvailableOutlinedIcon /> &nbsp;{'Reserva '}
            {selectedResource?.resourceName}
          </Title>
        </DialogTitle>
        <DialogContent dividers={true}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Item>
                <ApartmentOutlinedIcon
                  className={classes.placeIcon}
                  fontSize="small"
                />
                &nbsp;{building?.place}
                &nbsp;&nbsp;
                <PlaceOutlinedIcon
                  className={classes.placeIcon}
                  fontSize="small"
                />
                &nbsp;{building?.name}
              </Item>
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
                fullWidth
                InputProps={{
                  startAdornment: (
                    <IconButton size="small" edge="start">
                      <CalendarTodayIcon fontSize="small" />
                    </IconButton>
                  )
                }}
                autoOk
                disableToolbar
                label="Data d'inici"
                value={event.startDate}
                format="dd/MM/yyyy"
                variant="inline"
                inputVariant="outlined"
                disablePast
                onChange={(date) => setEvent({ ...event, startDate: date })}
              />
            </Grid>

            <Grid item xs={6}>
              <DatePicker
                fullWidth
                autoOk
                InputProps={{
                  startAdornment: (
                    <IconButton size="small" edge="start">
                      <CalendarTodayIcon fontSize="small" />
                    </IconButton>
                  )
                }}
                inputVariant="outlined"
                disableToolbar
                label="Data de fi"
                value={event.endDate}
                format="dd/MM/yyyy"
                variant="inline"
                onChange={(date) => setEvent({ ...event, endDate: date })}
                minDate={event.startDate}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeDialogFb}
            color="secondary"
            variant="contained"
            disableElevation>
            Cancel·la
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disableElevation>
            Accepta
          </Button>
        </DialogActions>
      </Dialog>
    </Workspace>
  )
}

export default WorkspaceWrapper

const Workspace = styled.div`
  display: flex;
`

const Item = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  margin-bottom: 8px;
`

const Title = styled.span`
  display: flex;
  align-items: center;
`

const useStyles = makeStyles((theme) => ({
  placeIcon: {
    color: 'rgba(0, 0, 0, 0.54)'
  },
  noBottomSpace: {
    paddingBottom: '0 !important'
  }
}))
