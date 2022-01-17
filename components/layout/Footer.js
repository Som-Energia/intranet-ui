import Box from '@mui/material/Box'
import { useTheme } from '@mui/styles'

const Footer = () => {
  const theme = useTheme()

  return (
    <Box
      variant="footer"
      sx={{
        padding: theme.spacing(2),
        backgroundColor: 'white',
        minHeight: '80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 500
      }}>
      <Box
        sx={{
          textAlign: 'center',
          '@media (min-width: 780px)': {
            display: 'flex'
          }
        }}>
        <Box variant="span">Som Energia © {new Date().getFullYear()}</Box>
        <Box
          sx={{
            '@media (min-width: 780px)': {
              '&::before': {
                margin: '0 8px',
                content: '"|"'
              }
            }
          }}>
          Made with 💚 and open source
        </Box>
      </Box>
    </Box>
  )
}

export default Footer
