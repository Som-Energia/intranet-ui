import { useState } from 'react'

import { signIn, signOut, useSession } from 'next-auth/client'

import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { makeStyles } from '@mui/styles'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'

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
          <span>{session?.user?.name}</span>
          <IconButton
            onClick={handleClick}
            aria-controls="userMenu"
            aria-haspopup="true">
            <Avatar alt={session?.user?.name} src={session?.user?.image} />
          </IconButton>
          <Menu
            id="userMenu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}>
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
