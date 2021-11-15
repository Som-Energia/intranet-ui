import { useState } from 'react'
import { styled } from '@mui/material/styles'

import TableResource, { MeetingRoom } from '@components/resources/TableResource'
import WorkspaceWrapper from '@components/resources/WorkspaceWrapper'

const Balneari = (props) => {
  const { resources, events, isLoading, token, reloadResources, date } = props

  const [selectedResource, setSelectedResource] = useState(false)

  const openDialog = (resource) => {
    setSelectedResource(resource)
  }

  const closeDialog = () => {
    setSelectedResource(false)
  }

  return (
    <WorkspaceWrapper
      selectedResource={selectedResource}
      reloadResources={reloadResources}
      closeDialogFb={closeDialog}
      date={date}
      token={token}>
      <MeetingRooms>
        <MeetingRoom name="BALNEARI_SALA" sx={{ height: '350px' }} />
      </MeetingRooms>

      <TableZone>
        <TableRow>
          <TableBlock>
            <TableResource
              name="BALNEARI_T1"
              resources={resources}
              events={events}
              isLoading={isLoading}
              onClick={openDialog}
            />
            <TableResource
              name=""
              resources={resources}
              events={events}
              isLoading={isLoading}
              onClick={openDialog}
            />
            <TableResource
              name=""
              resources={resources}
              events={events}
              isLoading={isLoading}
              onClick={openDialog}
            />
            <TableResource
              name="BALNEARI_T2"
              resources={resources}
              events={events}
              isLoading={isLoading}
              onClick={openDialog}
            />
          </TableBlock>

          <TableBlock>
            <TableResource
              name="BALNEARI_T3"
              resources={resources}
              events={events}
              isLoading={isLoading}
              onClick={openDialog}
            />
            <TableResource
              name=""
              resources={resources}
              events={events}
              isLoading={isLoading}
              onClick={openDialog}
            />
            <TableResource
              name=""
              resources={resources}
              events={events}
              isLoading={isLoading}
              onClick={openDialog}
            />
            <TableResource
              name="BALNEARI_T4"
              resources={resources}
              events={events}
              isLoading={isLoading}
              onClick={openDialog}
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
              onClick={openDialog}
            />
            <TableResource
              name="BALNEARI_T5"
              resources={resources}
              events={events}
              isLoading={isLoading}
              onClick={openDialog}
            />
            <TableResource
              name="BALNEARI_T7"
              resources={resources}
              events={events}
              isLoading={isLoading}
              onClick={openDialog}
            />
            <TableResource
              name=""
              resources={resources}
              events={events}
              isLoading={isLoading}
              onClick={openDialog}
            />
          </TableBlock>

          <TableBlock>
            <TableResource
              name=""
              resources={resources}
              events={events}
              isLoading={isLoading}
              onClick={openDialog}
            />
            <TableResource
              name="BALNEARI_T6"
              resources={resources}
              events={events}
              isLoading={isLoading}
              onClick={openDialog}
            />
            <TableResource
              name="BALNEARI_T8"
              resources={resources}
              events={events}
              isLoading={isLoading}
              onClick={openDialog}
            />
            <TableResource
              name=""
              resources={resources}
              events={events}
              isLoading={isLoading}
              onClick={openDialog}
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
              onClick={openDialog}
            />
            <TableResource
              name=""
              resources={resources}
              events={events}
              isLoading={isLoading}
              onClick={openDialog}
            />
            <TableResource
              name=""
              resources={resources}
              events={events}
              isLoading={isLoading}
              onClick={openDialog}
            />
            <TableResource
              name="BALNEARI_T11"
              resources={resources}
              events={events}
              isLoading={isLoading}
              onClick={openDialog}
            />
          </TableBlock>

          <TableBlock>
            <TableResource
              name=""
              resources={resources}
              events={events}
              isLoading={isLoading}
              onClick={openDialog}
            />
            <TableResource
              name="BALNEARI_T10"
              resources={resources}
              events={events}
              isLoading={isLoading}
              onClick={openDialog}
            />
            <TableResource
              name="BALNEARI_T12"
              resources={resources}
              events={events}
              isLoading={isLoading}
              onClick={openDialog}
            />
            <TableResource
              name=""
              resources={resources}
              events={events}
              isLoading={isLoading}
              onClick={openDialog}
            />
          </TableBlock>
        </TableRow>
      </TableZone>
    </WorkspaceWrapper>
  )
}

export default Balneari

const TableZone = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const TableRow = styled('div')`
  display: flex;
  grid-template-columns: 1fr 1fr;
  column-gap: 100px;
`

const MidTableRow = styled(TableRow)`
  column-gap: 4px;
  padding-left: 256px;
`

const TableBlock = styled('div')`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 8px;
  margin-bottom: 64px;
`

const MeetingRooms = styled('div')`
  width: 20%;
  padding-top: 16px;
  padding-right: 16px;
  display: flex;
  align-items: center;
`
