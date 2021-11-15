import React from 'react'
import Link from 'next/link'

import { useTheme } from '@mui/styles'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import MuiLink from '@mui/material/Link'

import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined'

const WorkspaceItem = (props) => {
  const { id, name, place } = props
  const theme = useTheme()

  return (
    <>
      <Card sx={{ display: 'flex' }} elevation={0}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Link href={`/resources/${id}`} passHref>
            <MuiLink sx={{ textDecoration: 'none' }} color="inherit">
              <CardContent
                sx={{
                  flex: '1 0 auto',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    marginBottom: '4px'
                  }}>
                  <ApartmentOutlinedIcon
                    sx={{ color: 'rgba(0, 0, 0, 0.54)', marginRight: '4px' }}
                    fontSize="small"
                  />
                  {place}
                </Typography>
                <Typography
                  component="h5"
                  variant="h5"
                  sx={{
                    minHeight: '64px'
                  }}>
                  {name}
                </Typography>
              </CardContent>
            </MuiLink>
          </Link>
        </Box>
      </Card>
    </>
  )
}

export default WorkspaceItem
