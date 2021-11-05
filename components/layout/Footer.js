import Box from '@mui/material/Box'

const Footer = () => {
  return (
    <Box
      variant="footer"
      sx={{
        padding: 'theme.spacing(2)',
        backgroundColor: 'white',
        minHeight: '80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 500
      }}>
      <div>
        Som Energia © {new Date().getFullYear()} | Made with 💚 and open source
      </div>
    </Box>
  )
}

export default Footer
