import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#96b633',
      contrastText: '#fff'
    },
    secondary: {
      main: '#a1a1a1'
    },
    error: {
      main: red['500']
    },
    background: {
      default: '#f2f2f2'
    },
    text: {
      primary: '#4d4d4d'
    },
    typography: {
      htmlFontSize: 16
    },
    shape: {
      borderRadius: '0'
    }
  }
})

export default theme
