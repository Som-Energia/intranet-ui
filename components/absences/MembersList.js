import React from 'react'

import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import Fade from '@mui/material/Fade'

import EditMenu from 'components/EditMenu'

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

const MembersList = (props) => {
  const {
    members = [],
    active = true,
    onAdd = false,
    onEdit = false,
    onDelete = false,
    customize,
    gridItemSize = 4
  } = props
  const classes = useStyles()

  return (
    <>
      {members.map((member) => (
        <Grid
          key={member.id}
          className={classes.listItem}
          item
          xs={12}
          sm={gridItemSize}>
          <Fade in={active}>
            <Card className={classes.card} elevation={0}>
              <CardHeader
                avatar={
                  <Avatar aria-label="member" className={classes.avatar}>
                    {member.first_name.charAt(0).toUpperCase()}
                  </Avatar>
                }
                action={
                  <EditMenu
                    onAdd={onAdd === false ? false : () => onAdd(member)}
                    onEdit={onEdit === false ? false : () => onEdit(member)}
                    onDelete={
                      onDelete === false ? false : () => onDelete(member)
                    }
                    customize={customize}
                  />
                }
                title={`${member.first_name} ${member.last_name}`}
                subheader={member.email}
              />
            </Card>
          </Fade>
        </Grid>
      ))}
    </>
  )
}

export default MembersList
