import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import TableResource from '@/components/resources/TableResource'

const JunglaCristal = ({ resources, events, isLoading }) => {
  return (
    <Workspace>
      <Window>
        <WindowV />
      </Window>

      <TableZone>
        <Window>
          <WindowH />
        </Window>

        <TableBlock>
          <TableResource
            name="JUNGLA_IT_1"
            resources={resources}
            events={events}
            isLoading={isLoading}
          />
          <TableResource
            name="JUNGLA_IT_2"
            resources={resources}
            events={events}
            isLoading={isLoading}
          />
          <TableResource
            name="JUNGLA_IT_3"
            resources={resources}
            events={events}
            isLoading={isLoading}
          />
          <TableResource
            name="JUNGLA_IT_4"
            resources={resources}
            events={events}
            isLoading={isLoading}
          />
        </TableBlock>

        <TableBlock>
          <TableResource
            name="JUNGLA_IT_5"
            resources={resources}
            events={events}
            isLoading={isLoading}
          />
          <TableResource
            name="JUNGLA_IT_6"
            resources={resources}
            events={events}
            isLoading={isLoading}
          />
          <TableResource
            name="JUNGLA_T1"
            resources={resources}
            events={events}
            isLoading={isLoading}
          />
          <TableResource
            name="JUNGLA_T2"
            resources={resources}
            events={events}
            isLoading={isLoading}
          />
        </TableBlock>

        <TableBlock>
          <TableResource
            name="JUNGLA_T3"
            resources={resources}
            events={events}
            isLoading={isLoading}
          />
          <TableResource
            name="JUNGLA_T4"
            resources={resources}
            events={events}
            isLoading={isLoading}
          />
          <TableResource
            name="JUNGLA_T5"
            resources={resources}
            events={events}
            isLoading={isLoading}
          />
          <TableResource
            name="JUNGLA_T6"
            resources={resources}
            events={events}
            isLoading={isLoading}
          />
        </TableBlock>

        <TableBlock>
          <TableResource
            name="JUNGLA_T7"
            resources={resources}
            events={events}
            isLoading={isLoading}
          />
          <TableResource
            name="JUNGLA_T8"
            resources={resources}
            events={events}
            isLoading={isLoading}
          />
          <TableResource
            name="JUNGLA_T9"
            resources={resources}
            events={events}
            isLoading={isLoading}
          />
          <TableResource
            name="JUNGLA_T10"
            resources={resources}
            events={events}
            isLoading={isLoading}
          />
        </TableBlock>

        <Window>
          <WindowH />
        </Window>
      </TableZone>
      <MeetingRooms>
        <MeetingRoom>JUNGLA_MAGATZEM</MeetingRoom>
        <MeetingRoom>JUNGLA_SALA_TV</MeetingRoom>
      </MeetingRooms>
    </Workspace>
  )
}

export default JunglaCristal

const Workspace = styled.div`
  display: flex;
`

const TableZone = styled.div`
  width: 60%;
  padding-right: 96px;
`

const MeetingRooms = styled.div`
  width: 40%;
  padding-top: 16px;
  padding-right: 16px;
  padding-left: 48px;
  display: grid;
  grid-template-rows: 25% 25% 25% 25%;
  gap: 8px;
`

const MeetingRoom = styled.div`
  border-radius: 5px;
  background-color: #eee;
  padding: 24px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
`

const TableBlock = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
  gap: 4px;
  margin-bottom: 64px;
`
const Window = styled.div`
  padding: 16px;
`

const WindowV = styled.div`
  width: 6px;
  height: 100%;
  background: #c0c0ef;
`

const WindowH = styled.div`
  width: 100%;
  height: 6px;
  background: #c0c0ef;
`
