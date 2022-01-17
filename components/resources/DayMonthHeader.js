import { useState } from 'react'
import * as dayjs from 'dayjs'
import 'dayjs/locale/ca'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import DatePicker from '@mui/lab/DatePicker'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Typography } from '@mui/material'

const DayMonthHeader = (props) => {
  const { date, handlePrev, handleNext, handlePicker } = props
  const [open, setOpen] = useState(false)

  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: '0'
      }}
      elevation={0}>
      <IconButton aria-label="previous" onClick={handlePrev}>
        <ArrowBackIosIcon />
      </IconButton>
      <Box sx={{ display: 'flex' }}>
        <DatePicker
          open={open}
          value={date}
          minDate={new Date()}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          onChange={(newValue) => {
            handlePicker(dayjs(newValue).startOf('day'))
            setOpen(false)
          }}
          renderInput={({ inputRef, inputProps, InputProps }) => (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {InputProps?.endAdornment}
              </Box>
              <Typography
                variant="h5"
                onClick={() => setOpen(true)}
                sx={{
                  fontSize: '1.2rem',
                  fontWeight: 400,
                  margin: '16px',
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
