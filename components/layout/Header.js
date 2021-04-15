import { makeStyles } from '@material-ui/core/styles'

import Link from 'next/link'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import UserMenu from '@/components/layout/UserMenu'

const Header = () => {
  const classes = useStyles()

  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="secondary"
          aria-label="menu">
          <MenuIcon fontSize="large" />
        </IconButton>
        <Link href="/">
          <div className={classes.logo}>
            <img src="/cuca.png" alt="cuca" />
            <Typography variant="h1">Som Energia</Typography>
          </div>
        </Link>
        <UserMenu />
      </Toolbar>
    </AppBar>
  )
}

export default Header

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  logo: {
    flexGrow: 1,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    '& img': {
      maxHeight: '38px',
      marginRight: '12px',
      marginBottom: '8px'
    },
    '& h1': {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: theme.palette.text.primary
    }
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center'
  }
}))
