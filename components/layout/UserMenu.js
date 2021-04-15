import { useState } from 'react'

import { signIn, signOut, useSession } from 'next-auth/client'

import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'

import AccountCircleIcon from '@material-ui/icons/AccountCircle'

export default function UserMenu() {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [session, loading] = useSession()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      {!session && (
        <IconButton
          onClick={() => signIn()}
          disabled={loading}
          edge="start"
          color="secondary"
          aria-label="user">
          <AccountCircleIcon fontSize="large" />
        </IconButton>
      )}
      {session && (
        <div className={classes.userProfile}>
          <span>{session.user.name}</span>
          <IconButton
            onClick={handleClick}
            aria-controls="userMenu"
            aria-haspopup="true">
            <Avatar alt={session.user.name} src={session.user.image} />
          </IconButton>
          <Menu
            id="userMenu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={() => signOut()}>Logout</MenuItem>
          </Menu>
        </div>
      )}
    </>
  )
}

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
    alignItems: 'center',
    '& > span': {
      paddingRight: '8px',
      textTransform: 'uppercase'
    }
  }
}))
