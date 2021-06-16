import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(2),
    backgroundColor: 'white',
    minHeight: '80px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 500
  }
}))

const Footer = () => {
  const classes = useStyles()
  return (
    <footer className={classes.footer}>
      <div>
        Som Energia © {new Date().getFullYear()} | Made with 💚 and open source
      </div>
    </footer>
  )
}

export default Footer
