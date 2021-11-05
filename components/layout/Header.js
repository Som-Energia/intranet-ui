import Link from 'next/link'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

import MenuIcon from '@mui/icons-material/Menu'

import UserMenu from '@components/layout/UserMenu'
require('typeface-montserrat')

const Header = () => {
  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Toolbar>
        <IconButton
          edge="start"
          sx={{ marginRight: 'theme.spacing(2)' }}
          color="secondary"
          aria-label="menu">
          <MenuIcon fontSize="large" />
        </IconButton>
        <Link href="/">
          <Box
            sx={{
              flexGrow: 1,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}>
            <img
              src="/cuca.png"
              alt="cuca"
              style={{
                maxHeight: '38px',
                marginLeft: '12px',
                marginRight: '12px',
                marginBottom: '8px'
              }}
            />
            <Typography
              variant="h1"
              sx={{
                fontFamily: 'Montserrat',
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                color: 'theme.palette.text.primary'
              }}>
              Intranet
            </Typography>
          </Box>
        </Link>
        <UserMenu />
      </Toolbar>
    </AppBar>
  )
}

export default Header
