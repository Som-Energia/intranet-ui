import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import TableResource from '@/components/resources/TableResource'

const JunglaCristal = ({ resources, events, isLoading }) => {
  return (
    <Workspace>
      <DoorLeft />
      <TableZone>
        <TableBlock>
          <TableResource
            name=""
            resources={resources}
            events={events}
            isLoading={isLoading}
          />
          <TableResource
            name="UPPERCASADEMONT23_T1"
            resources={resources}
            events={events}
            isLoading={isLoading}
          />
          <TableResource
            name="UPPERCASADEMONT23_T3"
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
            name="UPPERCASADEMONT23_T5"
            resources={resources}
            events={events}
            isLoading={isLoading}
          />
          <TableResource
            name="UPPERCASADEMONT23_T7"
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
            name="UPPERCASADEMONT23_T9"
            resources={resources}
            events={events}
            isLoading={isLoading}
          />
          <TableResource
            name="UPPERCASADEMONT23_T11"
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
        <Window>
          <WindowH />
        </Window>
      </TableZone>

      <TableZone>
        <TableBlock>
          <TableResource
            name=""
            resources={resources}
            events={events}
            isLoading={isLoading}
          />
          <TableResource
            name="UPPERCASADEMONT23_T2"
            resources={resources}
            events={events}
            isLoading={isLoading}
          />
          <TableResource
            name="UPPERCASADEMONT23_T4"
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
            name="UPPERCASADEMONT23_T6"
            resources={resources}
            events={events}
            isLoading={isLoading}
          />
          <TableResource
            name="UPPERCASADEMONT23_T8"
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
            name="UPPERCASADEMONT23_T10"
            resources={resources}
            events={events}
            isLoading={isLoading}
          />
          <TableResource
            name="UPPERCASADEMONT23_T12"
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
        <Window>
          <WindowH />
        </Window>
      </TableZone>
      <Door />
    </Workspace>
  )
}

export default JunglaCristal

const Workspace = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr 1fr auto;
  column-gap: 32px;
`

const TableZone = styled.div``

const TableBlock = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
  gap: 4px;
  margin-bottom: 64px;
`
const Window = styled.div`
  padding-bottom: 16px;
`

const WindowH = styled.div`
  width: 100%;
  height: 6px;
  background: #adcfec;
`
const Door = styled.div`
  margin: 16px;
  margin-left: 0;
  background: rgb(233, 223, 196);
  width: 6px;
  height: 90px;
`

const DoorLeft = styled(Door)`
  margin-left: 16px;
  margin-right: 0;
  align-self: end;
`
