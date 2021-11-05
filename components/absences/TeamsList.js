import React from 'react'

import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import Fade from '@mui/material/Fade'

import EditMenu from '../EditMenu'

import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(2)
  },
  paperTabs: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  list: {
    margin: '0 0 0 -8px'
  },
  listItem: {
    padding: '8px 0 8px 8px'
  }
}))

const TeamsList = (props) => {
  const {
    teams = [],
    active = true,
    onAdd = () => {},
    onEdit = () => {},
    onDelete = () => {},
    customize
  } = props
  const classes = useStyles()

  return (
    <>
      {teams.map((team) => (
        <Grid key={team.id} className={classes.listItem} item xs={12} sm={4}>
          <Fade in={true}>
            <Card className={classes.card} elevation={0}>
              <CardHeader
                avatar={
                  <Avatar aria-label="member" className={classes.avatar}>
                    {team.name.charAt(0).toUpperCase()}
                  </Avatar>
                }
                action={
                  <EditMenu
                    onAdd={() => onAdd(team)}
                    onEdit={() => onEdit(team)}
                    onDelete={() => onDelete(team)}
                    customize={customize}
                  />
                }
                title={`${team.name}`}
                subheader={''}
              />
            </Card>
          </Fade>
        </Grid>
      ))}
    </>
  )
}

export default TeamsList
