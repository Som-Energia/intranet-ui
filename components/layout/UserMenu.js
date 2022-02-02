import { useState } from 'react'

import { signIn, signOut, useSession } from 'next-auth/client'

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { makeStyles } from '@mui/styles'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import LogoutIcon from '@mui/icons-material/Logout'

export default function UserMenu() {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [session, loading] = useSession()
  const isUser = !!session?.user

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  if (!isUser) {
    return (
      <>
        <IconButton
          onClick={() => signIn()}
          disabled={loading}
          edge="start"
          color="secondary"
          aria-label="user">
          <AccountCircleIcon fontSize="large" />
        </IconButton>
      </>
    )
  }

  return (
    <>
      <Box className={classes.userProfile}>
        <Box
          component="span"
          sx={{
            '@media (max-width: 780px)': {
              display: 'none'
            }
          }}>
          {session?.user?.name}
        </Box>
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
          <MenuItem sx={{ fontSize: '0.85rem' }} disabled>
            <ListItemIcon>
              <PersonOutlineIcon />
            </ListItemIcon>
            {session?.user?.email}
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => signOut()}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>Tanca sessió</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
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
