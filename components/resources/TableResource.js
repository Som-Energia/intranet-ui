import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { useTheme, styled } from '@mui/styles'
import Box from '@mui/material/Box'

const TableResource = (props) => {
  const { name, resources, events, isLoading, onClick = () => {} } = props

  const [connected, setConnected] = useState(false)
  const summary = events?.[name]?.items?.[0]?.summary || false
  const theme = useTheme()

  useEffect(() => {
    setConnected(typeof resources?.[name] !== 'undefined')
  }, [resources])

  return (
    <Table
      id={name}
      onClick={() => !summary && onClick(resources?.[name])}
      className={clsx(
        !connected && 'no-connected',
        !summary && 'free',
        isLoading && 'loading'
      )}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          padding: '8px 16px',
          borderRadius: '30px',
          fontSize: '0.9rem',
          fontWeight: 400
        }}>
        <Box
          sx={{
            width: '24px',
            height: '24px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          {name && <ComputerIcon />}
          {name}
        </Box>
        {summary && (
          <Box
            sx={{
              fontSize: '1rem',
              paddingTop: '6px',
              fontWeight: 400,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
            {summary}
          </Box>
        )}
      </Box>
    </Table>
  )
}

const Table = styled('div')(({ theme }) => ({
  padding: '16px 8px',
  borderRadius: '5px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '1rem',
  fontWeight: 500,
  background: '#96b63366',
  color: '#546714',
  border: '3px solid transparent',
  '&:hover': {
    border: '3px solid transparent'
  },
  '&.free': {
    cursor: 'pointer',
    color: '#546714',
    background: theme.palette.primary.main,
    '&:hover': {
      color: '#ffffff',
      background: '#546714'
    }
  },
  '&.no-connected': {
    cursor: 'default',
    background: '#f2f2f2 !important',
    '&:hover': {
      border: '3px solid transparent'
    }
  },
  '&.loading': {
    display: 'inline-block',
    position: 'relative',
    overflow: 'hidden',
    color: '#f2f2f2',
    backgroundColor: '##f2f2f2 !important',
    border: '3px solid transparent',

    '&:hover': {
      border: '3px solid transparent'
    },

    '&::after': {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      transform: 'translateX(-100%)',
      backgroundImage:
        'linear-gradient(90deg, #edeff1 0px, #d3d3d4 60px, #edeff1 120px)',
      animation: 'shimmer 2s infinite',
      content: ''
    },
    '& @keyframes shimmer': {
      '100%': {
        transform: 'translateX(100%)'
      }
    }
  }
}))

const ComputerIcon = () => (
  <Box
    sx={{
      marginRight: '4px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
    <svg
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      style={{ width: '18px', height: '18px' }}
      xmlns="http://www.w3.org/2000/svg">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
    </svg>
  </Box>
)

export const MeetingIcon = () => (
  <Box
    sx={{
      marginRight: '4px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      style={{ width: '18px', height: '18px' }}
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  </Box>
)

export const MeetingRoom = ({ name, sx }) => (
  <Box
    sx={{
      borderRadius: '5px',
      backgroundColor: '#f2f2f2',
      color: '#72808f',
      padding: '24px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '1rem',
      fontWeight: 400,
      ...sx
    }}>
    <MeetingIcon />
    {name}
  </Box>
)

export default TableResource
