import { makeStyles } from '@mui/styles'

import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const useStyles = makeStyles((theme) => ({
  yearContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: '0',
    '& h5': {
      fontSize: '1.5rem',
      fontWeight: 400,
      margin: '16px'
    }
  }
}))

const DayMonthHeader = (props) => {
  const classes = useStyles()
  const { date, handlePrev, handleNext } = props
  return (
    <Paper className={classes.yearContainer} elevation={0}>
      <IconButton aria-label="previous" onClick={handlePrev}>
        <ArrowBackIosIcon />
      </IconButton>
      <h5>{date}</h5>
      <IconButton aria-label="next" onClick={handleNext}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Paper>
  )
}

export default DayMonthHeader
