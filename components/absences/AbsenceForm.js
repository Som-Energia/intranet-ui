import React, { useState, useEffect } from 'react'

import useSWR from 'swr'

import { Formik } from 'formik'
import * as Yup from 'yup'

import { fetchWithToken } from '@lib/utils'

import * as dayjs from 'dayjs'
import 'dayjs/locale/ca'

import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Fab from '@mui/material/Fab'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Fade from '@mui/material/Fade'

import DatePicker from '@mui/lab/DatePicker'

import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined'
import SaveIcon from '@mui/icons-material/Save'

import { useTheme } from '@mui/styles'

const AbsenceForm = (props) => {
  const { absenceId, workerId, onSucces, onError } = props
  const token = '1'
  const theme = useTheme()

  const [editable, setEditable] = useState(true)

  const { data: types, isValidating: loadingTypes } = useSWR(
    [`${process.env.NEXT_PUBLIC_API_URL}/absencies/absencetype`, token],
    fetchWithToken
  )

  const loading = false
  const error = null

  const postAbsence = () => {}

  const [formResponse, setFormResponse] = useState(false)

  useEffect(() => {
    if (formResponse) {
      const message =
        error === false
          ? 'Absència creada correctament!'
          : "No s'ha pogut crear l'absència"
      const response = { state: error === false, message: message }
      onSucces(response)
    }
  }, [formResponse])

  const initialAbsence = {
    start_time: dayjs().toISOString(),
    end_time: dayjs().toISOString(),
    start_morning: true,
    end_afternoon: true,
    absence_type: '',
    worker: [workerId]
  }

  const firstDateHelper = 'Data inicial inclosa'
  const lastDateHelper = 'Data final inclosa'
  const firstHalfHelper = 'Primer matí inclòs'
  const lastHalfHelper = 'Darrera tarda inclosa'

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{ ...initialAbsence }}
      validateOnMount={true}
      validationSchema={Yup.object().shape({
        absence_type: Yup.number()
          .required("No has introduit un tipus d'absència")
          .test('minOneHalfDay', 'Mínim un mig dia', function () {
            return !(
              this.parent.start_time === this.parent.end_time &&
              !this.parent.end_afternoon &&
              !this.parent.start_morning
            )
          }),
        start_time: Yup.date().required("No has introduit una data d'inici"),
        end_time: Yup.date()
          .required('No has introduit una data de fi')
          .when(
            'start_time',
            (start_time, schema) =>
              start_time &&
              schema.min(start_time, "La data no pot ser anterior a la d'inici")
          )
      })}
      onSubmit={(values, { setSubmitting }) => {
        async function postForm() {
          await postAbsence(values)
          setFormResponse(true)
        }
        postForm()
      }}>
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isValid,
        isSubmitting,
        setFieldValue
      }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                select
                fullWidth
                label="Tipus d'absència"
                name="absence_type"
                variant="outlined"
                margin="normal"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.absence_type || ''}
                error={errors.absence_type && touched.absence_type}
                helperText={touched.absence_type && errors.absence_type}
                disabled={loadingTypes}>
                {types?.results &&
                  types?.results.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                required
                fullWidth
                variant="inline"
                autoOk
                disabled={values.absence_type === ''}
                disablePast="true"
                inputVariant="outlined"
                onChange={(event) =>
                  setFieldValue(
                    'start_time',
                    dayjs(event).format('YYYY-MM-DDT09:00:00')
                  )
                }
                onBlur={handleBlur}
                format="DD/MM/YYYY"
                InputProps={{
                  startAdornment: (
                    <IconButton>
                      <TodayOutlinedIcon />
                    </IconButton>
                  )
                }}
                disableToolbar
                label="Data inicial"
                name="values.start_time"
                value={values.start_time || ''}
                error={!!errors.start_time}
                helperText={errors.start_time || firstDateHelper}
              />
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                required
                fullWidth
                variant="inline"
                autoOk
                disabled={values.absence_type === ''}
                disablePast="true"
                inputVariant="outlined"
                onChange={(event) =>
                  setFieldValue(
                    'end_time',
                    dayjs(event).format('YYYY-MM-DDT17:00:00')
                  )
                }
                onBlur={handleBlur}
                format="DD/MM/YYYY"
                InputProps={{
                  startAdornment: (
                    <IconButton>
                      <TodayOutlinedIcon />
                    </IconButton>
                  )
                }}
                disableToolbar
                label="Data final"
                name="end_time"
                value={values.end_time || ''}
                error={!!errors.end_time}
                helperText={errors.end_time || lastDateHelper}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.start_morning}
                    onChange={(event) =>
                      setFieldValue('start_morning', !values.start_morning)
                    }
                    onBlur={handleBlur}
                    name="start_morning"
                    color="primary"
                  />
                }
                label={firstHalfHelper}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.end_afternoon}
                    onChange={(event) =>
                      setFieldValue('end_afternoon', !values.end_afternoon)
                    }
                    onBlur={handleBlur}
                    name="end_afternoon"
                    color="primary"
                  />
                }
                label={lastHalfHelper}
              />
            </Grid>
          </Grid>
          <Box mb={3}>
            <Fade in={editable} disableStrictModeCompat={true}>
              <Fab
                color="primary"
                aria-label="save"
                sx={{
                  position: 'absolute',
                  bottom: theme.spacing(2),
                  right: theme.spacing(2)
                }}
                disabled={!isValid || loading}
                onClick={handleSubmit}>
                <SaveIcon />
              </Fab>
            </Fade>
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default AbsenceForm
