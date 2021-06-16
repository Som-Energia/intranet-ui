import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

const ModalForm = (props) => {
  const {
    open,
    onClose,
    onAccept,
    title,
    showControls = true,
    children,
    maxWidth = 'sm'
  } = props

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        scroll="paper"
        maxWidth={maxWidth}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description">
        <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
        <DialogContent dividers={true}>{children}</DialogContent>
        {showControls && (
          <DialogActions>
            <Button data-cy="decline" variant="contained" onClick={onClose}>
              {'Cancel·la'}
            </Button>
            <Button
              data-cy="accept"
              onClick={onAccept}
              variant="contained"
              color="primary"
              disableElevation>
              {'Accepta'}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  )
}

export default ModalForm
