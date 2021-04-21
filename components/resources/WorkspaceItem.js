import React from 'react'
import Link from 'next/link'

import { makeStyles } from '@material-ui/core/styles'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import MuiLink from '@material-ui/core/Link'

import ApartmentOutlinedIcon from '@material-ui/icons/ApartmentOutlined'

const WorkspaceItem = (props) => {
  const { id, name, place } = props
  const classes = useStyles()

  return (
    <>
      <Card className={classes.root} elevation={0}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="subtitle1" color="textSecondary">
              <ApartmentOutlinedIcon
                className={classes.placeIcon}
                fontSize="small"
              />
              &nbsp;{place}
            </Typography>
            <Link href={`/resources/${id}`} passHref>
              <MuiLink color="inherit">
                <Typography
                  component="h5"
                  variant="h5"
                  className={classes.title}>
                  {name}
                </Typography>
              </MuiLink>
            </Link>
          </CardContent>
        </div>
      </Card>
    </>
  )
}

export default WorkspaceItem

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  content: {
    flex: '1 0 auto'
  },
  active: {
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    minHeight: '64px'
  },
  placeIcon: {
    color: 'rgba(0, 0, 0, 0.54)'
  }
}))
