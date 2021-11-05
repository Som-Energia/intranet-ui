import React from 'react'

import { makeStyles } from '@mui/styles'

import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const useStyles = makeStyles((theme) => ({
  yearContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '16px',
    '& h5': {
      fontSize: '2rem',
      fontWeight: 400,
      margin: '24px'
    }
  }
}))

const YearMonthHeader = (props) => {
  const classes = useStyles()
  const { yearMonth, handlePrev, handleNext } = props
  return (
    <Paper className={classes.yearContainer} elevation={0}>
      <IconButton aria-label="previous" onClick={handlePrev}>
        <ArrowBackIosIcon />
      </IconButton>
      <h5>{yearMonth}</h5>
      <IconButton aria-label="next" onClick={handleNext}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Paper>
  )
}

export default YearMonthHeader
