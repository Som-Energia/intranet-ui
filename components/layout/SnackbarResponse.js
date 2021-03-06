import React from 'react'

import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

const SnackbarResponse = (props) => {
  const { state, message, onClose } = props
  return (
    <Snackbar open={!!message} autoHideDuration={6000} onClose={onClose}>
      <Alert severity={state === true ? 'success' : 'error'}>
        {message === true ? 'Ha fallat alguna cosa...' : message}
      </Alert>
    </Snackbar>
  )
}

export default SnackbarResponse
