import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import styled from 'styled-components'

const TableResource = (props) => {
  const { name, resources, events, isLoading, onClick = () => {} } = props

  const [connected, setConnected] = useState(false)
  const summary = events?.[name]?.items?.[0]?.summary || false

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
      <NameWrapper>
        {name}
        {summary && <Summary>{summary}</Summary>}
      </NameWrapper>
    </Table>
  )
}

const Table = styled.div`
  padding: 16px 8px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  background: #edeff1;
  color: #4d5761;
  border: 3px solid transparent;

  &:hover {
    border: 3px solid transparent;
  }

  &.free {
    cursor: pointer;
    color: #546714;
    background: #b9db42;
    &:hover {
      border: 3px solid #546714;
    }
  }

  &.no-connected {
    cursor: default;
    background: #f9eaea !important;
    &:hover {
      border: 3px solid transparent;
    }
  }

  &.loading {
    display: inline-block;
    position: relative;
    overflow: hidden;
    color: #edeff1;
    background-color: #edeff1 !important;
    border: 3px solid transparent;

    &:hover {
      border: 3px solid transparent;
    }

    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transform: translateX(-100%);
      background-image: linear-gradient(
        90deg,
        #edeff1 0px,
        #d3d3d4 60px,
        #edeff1 120px
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
  font-size: 1rem;
  padding-top: 6px;
  font-weight: 400;
`

const NameWrapper = styled.div`
  text-align: center;
  padding: 8px 16px;
  border-radius: 30px;
`

export default TableResource
