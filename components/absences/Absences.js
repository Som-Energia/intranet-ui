import React, { useState, useEffect } from 'react'
import * as dayjs from 'dayjs'
import clsx from 'clsx'
import useSWR from 'swr'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Fab from '@mui/material/Fab'
import Grid from '@mui/material/Grid'
import Skeleton from '@material-ui/lab/Skeleton'
import Fade from '@mui/material/Fade'

import { makeStyles } from '@mui/styles'
import AddIcon from '@mui/icons-material/Add'

import { fetchWithToken } from '@lib/utils'
import { countHolidays, countAbsencesType } from '@lib/absences'

import SnackbarResponse from '@components/layout/SnackbarResponse'
import ModalForm from '@components/layout/ModalForm'

import AbsAnualCalendar from '@components/absences/AbsAnualCalendar'
import YearMonthHeader from '@components/absences/YearMonthHeader'
import AbsencePeriod from '@components/absences/AbsencePeriod'
import AbsenceForm from '@components/absences/AbsenceForm'

const Absences = () => {
  const classes = useStyles()

  const [year, setYear] = useState(dayjs().year())
  const [open, setOpen] = useState(false)
  const [absenceForm, setAbsenceForm] = useState()
  const [totalAbsences, setTotalAbsences] = useState('-')
  const [totalHolidays, setTotalHolidays] = useState('-')
  const [formResponse, setFormResponse] = useState({})

  const nextYear = () => {
    const next = year + 1
    next <= dayjs().year() + 1 && setYear(next)
  }

  const prevYear = () => {
    const prev = year - 1
    prev >= dayjs().year() - 5 && setYear(prev)
  }

  const handleAccept = (response = {}) => {
    setOpen(false)
    setFormResponse(response)
    /*
    response?.state === true &&
      fetch(
        `/absencies/absences?worker=${user_id}&start_period=${year}-01-01&end_period=${year}-12-31`
      )
    */
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleEdit = (absence) => {
    setOpen(true)
    setAbsenceForm(absence)
  }

  /*
  const { user } = useAuthState()
  const { user_id } = user
  */

  const userId = 1
  const token = null

  const {
    data,
    isValidating: loading,
    error
  } = useSWR(
    [
      `${process.env.NEXT_PUBLIC_API_URL}/absencies/absences?worker=${userId}&start_period=${year}-01-01&end_period=${year}-12-31`,
      token
    ],
    fetchWithToken
  )

  const { data: types, error: errorTypes } = useSWR(
    [`${process.env.NEXT_PUBLIC_API_URL}/absencies/absencetype`, token],
    fetchWithToken
  )

  const { data: member, error: errorMember } = useSWR(
    [`${process.env.NEXT_PUBLIC_API_URL}/absencies/workers/${userId}`, token],
    fetchWithToken
  )

  useEffect(() => {
    let holidays = false
    let absences = false
    if (data?.results) {
      holidays = countHolidays(data?.results)
      absences = countAbsencesType(data?.results)
    }
    setTotalHolidays(holidays)
    setTotalAbsences(absences)
  }, [data])

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <YearMonthHeader
            yearMonth={year}
            handlePrev={prevYear}
            handleNext={nextYear}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          {data?.results &&
            types?.results &&
            data?.results.map((absence, index) => (
              <Fade key={index} in={true}>
                <Card
                  className={clsx(classes.paper, !index && classes.noMarginTop)}
                  elevation={0}>
                  <CardContent className={classes.contentItem}>
                    <AbsencePeriod
                      absence={absence}
                      types={types?.results}
                      onEdit={handleEdit}
                    />
                  </CardContent>
                </Card>
              </Fade>
            ))}

          {(!data?.results || !data.count) && (
            <>
              {loading ? (
                [...new Array(7)].map((value, index) => (
                  <Fade key={value} in={loading}>
                    <Skeleton variant="rect" width="100%">
                      <Card
                        className={clsx(
                          classes.paper,
                          !index && classes.noMarginTop
                        )}
                        elevation={0}>
                        <CardContent className={classes.contentItem}>
                          <AbsencePeriod absence={{}} types={false} />
                        </CardContent>
                      </Card>
                    </Skeleton>
                  </Fade>
                ))
              ) : (
                <Fade in={true}>
                  <Card
                    className={clsx(classes.paper, classes.noMarginTop)}
                    elevation={0}>
                    <CardContent className={classes.contentItem}>
                      <div className={classes.emptyContent}>
                        No hi ha absències per aquest període
                      </div>
                    </CardContent>
                  </Card>
                </Fade>
              )}
            </>
          )}
        </Grid>
        <Grid item xs={12} sm={7}>
          <Card
            className={clsx(classes.paper, classes.noMarginTop)}
            elevation={0}>
            <CardContent>
              <div className={classes.resum}>
                <div className={classes.resumItem}>
                  <div className={classes.super}>{totalAbsences}</div>
                  <div className={classes.superDesc}>DIES TOTALS</div>
                </div>
                <div className={classes.resumItem}>
                  <div className={classes.super}>
                    {member?.holidays ? member?.holidays : '-'}
                  </div>
                  <div className={classes.superDesc}>DIES DISPONIBLES</div>
                </div>
                <div className={classes.resumItem}>
                  <div className={classes.super}>{totalHolidays}</div>
                  <div className={classes.superDesc}>DIES UTILITZATS</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={classes.paper} elevation={0}>
            <CardContent>
              <AbsAnualCalendar
                year={year}
                absences={data?.results}
                types={types?.results}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Fade in={true} disableStrictModeCompat={true}>
        <Fab
          color="primary"
          aria-label="edit"
          className={classes.fab}
          onClick={() => setOpen(true)}>
          <AddIcon />
        </Fab>
      </Fade>

      <ModalForm
        title={'Nova absència'}
        open={open}
        showControls={false}
        onAccept={handleAccept}
        onClose={handleClose}>
        <AbsenceForm
          absenceId={absenceForm ? absenceForm?.id : null}
          workerId={userId}
          onSucces={handleAccept}
        />
      </ModalForm>

      <SnackbarResponse
        state={false}
        message={/* error || errorMember || errorTypes */ ''}
        onClose={() => {}}
      />
      <SnackbarResponse
        state={formResponse?.state}
        message={formResponse?.message}
        onClose={() => setFormResponse({})}
      />
    </>
  )
}

export default Absences

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
    paddingBottom: '12px'
  },
  noMarginTop: {
    marginTop: 0
  },
  contentItem: {
    padding: '16px 0 16px 16px',
    '&:last-child': {
      paddingBottom: '16px'
    }
  },
  yearContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '16px',
    '& h1': {
      fontSize: '36px'
    }
  },
  resum: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  resumItem: {
    textAlign: 'center',
    flexGrow: 1
  },
  super: {
    fontSize: '30px'
  },
  superDesc: {
    fontSize: '14px',
    letterSpacing: '1px',
    textTransform: 'uppercase'
  },
  emptyContent: {
    fontSize: '16px',
    textTransform: 'uppercase',
    margin: '24px 0'
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}))
