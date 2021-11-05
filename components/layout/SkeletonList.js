import React from 'react'

import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import Skeleton from '@material-ui/lab/Skeleton'
import Fade from '@mui/material/Fade'

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

const SkeletonList = ({ numItems }) => {
  const classes = useStyles()

  return (
    <>
      {[...new Array(numItems)].map((item, index) => (
        <Grid key={index} className={classes.listItem} item xs={12} sm={4}>
          <Fade in={true}>
            <Skeleton variant="rect" width="100%">
              <Card className={classes.card} elevation={0}>
                <CardHeader
                  avatar={
                    <Avatar
                      aria-label="empty-item"
                      className={classes.avatar}></Avatar>
                  }
                />
              </Card>
            </Skeleton>
          </Fade>
        </Grid>
      ))}
    </>
  )
}

export default SkeletonList
