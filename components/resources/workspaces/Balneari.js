import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import TableResource from '@/components/resources/TableResource'

const Balneari = ({ resources, events, isLoading }) => {
  return (
    <Workspace>
      <MeetingRooms>
        <Door />
        <MeetingRoom>BALNEARI_SALA</MeetingRoom>
        <Door />
      </MeetingRooms>

      <TableZone>
        <TableRow>
          <TableBlock>
            <TableResource
              name="BALNEARI_T1"
              resources={resources}
              events={events}
              isLoading={isLoading}
            />
            <TableResource
              name=""
              resources={resources}
              events={events}
              isLoading={isLoading}
            />
            <TableResource
              name=""
              resources={resources}
              events={events}
              isLoading={isLoading}
            />
            <TableResource
              name="BALNEARI_T2"
              resources={resources}
              events={events}
              isLoading={isLoading}
            />
          </TableBlock>

          <TableBlock>
            <TableResource
              name="BALNEARI_T3"
              resources={resources}
              events={events}
              isLoading={isLoading}
            />
            <TableResource
              name=""
              resources={resources}
              events={events}
              isLoading={isLoading}
            />
            <TableResource
              name=""
              resources={resources}
              events={events}
              isLoading={isLoading}
            />
            <TableResource
              name="BALNEARI_T4"
              resources={resources}
              events={events}
              isLoading={isLoading}
            />
          </TableBlock>
        </TableRow>

        <MidTableRow>
          <TableBlock>
            <TableResource
              name=""
              resources={resources}
              events={events}
              isLoading={isLoading}
            />
            <TableResource
              name="BALNEARI_T5"
              resources={resources}
              events={events}
              isLoading={isLoading}
            />
            <TableResource
              name="BALNEARI_T7"
              resources={resources}
              events={events}
              isLoading={isLoading}
            />
            <TableResource
              name=""
              resources={resources}
              events={events}
              isLoading={isLoading}
            />
          </TableBlock>

          <TableBlock>
            <TableResource
              name=""
              resources={resources}
              events={events}
              isLoading={isLoading}
            />
            <TableResource
              name="BALNEARI_T6"
              resources={resources}
              events={events}
              isLoading={isLoading}
            />
            <TableResource
              name="BALNEARI_T8"
              resources={resources}
              events={events}
              isLoading={isLoading}
            />
            <TableResource
              name=""
              resources={resources}
              events={events}
              isLoading={isLoading}
            />
          </TableBlock>
        </MidTableRow>

        <TableRow>
          <TableBlock>
            <TableResource
              name="BALNEARI_T9"
              resources={resources}
              events={events}
              isLoading={isLoading}
            />
            <TableResource
              name=""
              resources={resources}
              events={events}
              isLoading={isLoading}
            />
            <TableResource
              name=""
              resources={resources}
              events={events}
              isLoading={isLoading}
            />
            <TableResource
              name="BALNEARI_T11"
              resources={resources}
              events={events}
              isLoading={isLoading}
            />
          </TableBlock>

          <TableBlock>
            <TableResource
              name=""
              resources={resources}
              events={events}
              isLoading={isLoading}
            />
            <TableResource
              name="BALNEARI_T10"
              resources={resources}
              events={events}
              isLoading={isLoading}
            />
            <TableResource
              name="BALNEARI_T12"
              resources={resources}
              events={events}
              isLoading={isLoading}
            />
            <TableResource
              name=""
              resources={resources}
              events={events}
              isLoading={isLoading}
            />
          </TableBlock>
        </TableRow>
      </TableZone>

      <Window>
        <WindowV />
      </Window>
    </Workspace>
  )
}

export default Balneari

const Workspace = styled.div`
  display: flex;
  padding-top: 16px;
  padding-bottom: 16px;
`

const TableZone = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 256px;
`

const MidTableRow = styled(TableRow)`
  column-gap: 4px;
  padding-left: 256px;
`

const TableBlock = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 4px;
  margin-bottom: 64px;
`

const MeetingRooms = styled.div`
  width: 20%;
  padding-top: 16px;
  padding-right: 16px;
  padding-left: 16px;
  display: grid;
  grid-template-rows: auto 200px auto;
  gap: 8px;
`

const MeetingRoom = styled.div`
  width: 100%;
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
  height: 200px;
`
const Door = styled.div`
  margin: 16px;
  margin-left: 0;
  background: rgb(233, 223, 196);
  width: 6px;
  height: 64px;
`

const Window = styled.div`
  padding: 0 8px 0 16px;
`

const WindowV = styled.div`
  width: 6px;
  height: 100%;
  background: #adcfec;
`
