import { useState } from 'react'
import * as dayjs from 'dayjs'
import 'dayjs/locale/ca'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import DatePicker from '@mui/lab/DatePicker'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import TodayIcon from '@mui/icons-material/Today'

import { Typography } from '@mui/material'

const DayMonthHeader = (props) => {
  const { date, handlePrev, handleNext, handlePicker } = props
  const [open, setOpen] = useState(false)

  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '0',
        padding: '0 0.8rem',
        '@media (min-width: 780px)': {
          padding: '0 4rem'
        }
      }}
      elevation={0}>
      <IconButton aria-label="previous" onClick={handlePrev}>
        <ArrowBackIosIcon />
      </IconButton>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around'
        }}>
        <IconButton
          aria-label="Today"
          onClick={(event) => {
            event.preventDefault()
            handlePicker(dayjs().startOf('day'))
          }}
          sx={{ display: 'flex', alignItems: 'center' }}>
          <TodayIcon />
        </IconButton>
        <DatePicker
          open={open}
          value={date}
          minDate={new Date()}
          views={['day', 'month']}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          onChange={(newDate) => {
            handlePicker(dayjs(newDate).startOf('day'))
            setOpen(false)
          }}
          renderInput={({ inputRef, inputProps, InputProps }) => (
            <>
              <Typography
                variant="h5"
                onClick={() => setOpen(true)}
                sx={{
                  fontSize: '1.2rem',
                  fontWeight: 400,
                  margin: '16px 4px',
                  cursor: 'pointer',
                  '@media (min-width: 780px)': {
                    fontSize: '1.5rem'
                  }
                }}
                ref={inputRef}>
                {date.format('dddd, DD/MM/YYYY')}
              </Typography>
            </>
          )}
        />
      </Box>
      <IconButton aria-label="next" onClick={handleNext}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Paper>
  )
}

export default DayMonthHeader
