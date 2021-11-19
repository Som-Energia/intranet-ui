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
          label="Custom input"
          value={date}
          minDate={new Date()}
          onChange={(newValue) =>
            handlePicker(dayjs(newValue).hour(0).minute(0).second(0))
          }
          renderInput={({ inputRef, inputProps, InputProps }) => (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {InputProps?.endAdornment}
              </Box>
              <Typography
                variant="h5"
                sx={{ fontSize: '1.5rem', fontWeight: 400, margin: '16px' }}
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
