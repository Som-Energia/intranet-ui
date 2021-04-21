import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import styled from 'styled-components'

const TableResource = (props) => {
  const { name, resources, events, isLoading } = props

  const [connected, setConnected] = useState(false)
  const summary = events?.[name]?.items?.[0]?.summary || false

  useEffect(() => {
    setConnected(typeof resources?.[name] !== 'undefined')
  }, [resources])

  return (
    <Table
      className={clsx(
        !connected && 'no-connected',
        !summary && 'free',
        isLoading && 'loading'
      )}>
      {name}
      {summary && <Summary>{summary}</Summary>}
    </Table>
  )
}

const Table = styled.div`
  padding: 24px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  background: rgb(233, 223, 196);

  &:hover {
    color: #fff;
  }

  &.free {
    background: #c3d598;
  }

  &.no-connected {
    background: #f3a2a2 !important;
  }

  &.loading {
    display: inline-block;
    position: relative;
    overflow: hidden;
    color: #eee;
    background-color: #eee;

    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transform: translateX(-100%);
      background-image: linear-gradient(
        90deg,
        #eee 0px,
        #fdfdfd 40px,
        #eee 80px
      );
      animation: shimmer 2s infinite;
      content: '';
    }

    @keyframes shimmer {
      100% {
        transform: translateX(100%);
      }
    }
  }
`

const Summary = styled.div`
  padding-top: 6px;
  font-weight: 400;
`

export default TableResource
