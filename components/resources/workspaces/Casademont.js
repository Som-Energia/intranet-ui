import styled from 'styled-components'

import WorkspaceWrapper from '@components/resources/WorkspaceWrapper'
import TableResource from '@components/resources/TableResource'

import useResourceDialog from '@components/resources/ResourceDialog'

const Casademont = (props) => {
  const {
    resources,
    events,
    isLoading,
    token,
    reloadResources,
    date,
    name,
    place
  } = props

  const [selectedResource, selectedEvent, openDialog, closeDialog] =
    useResourceDialog()

  return (
    <WorkspaceWrapper
      selectedResource={selectedResource}
      selectedEvent={selectedEvent}
      reloadResources={reloadResources}
      closeDialogFb={closeDialog}
      date={date}
      token={token}
      name={name}
      place={place}>
      <TableZone>
        <TableBlock>
          <TableResource
            name=""
            resources={resources}
            events={events}
            isLoading={isLoading}
            onClick={openDialog}
          />
          <TableResource
            name="UPPERCASADEMONT23_T1"
            resources={resources}
            events={events}
            isLoading={isLoading}
            onClick={openDialog}
          />
          <TableResource
            name="UPPERCASADEMONT23_T3"
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
          />
          <TableResource
            name="UPPERCASADEMONT23_T5"
            resources={resources}
            events={events}
            isLoading={isLoading}
            onClick={openDialog}
          />
          <TableResource
            name="UPPERCASADEMONT23_T7"
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
            onClick={openDialog}
          />
          <TableResource
            name="UPPERCASADEMONT23_T11"
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
          />
        </TableBlock>
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
            onClick={openDialog}
          />
          <TableResource
            name="UPPERCASADEMONT23_T4"
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
            onClick={openDialog}
          />
          <TableResource
            name="UPPERCASADEMONT23_T8"
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
            onClick={openDialog}
          />
          <TableResource
            name=""
            resources={resources}
            events={events}
            isLoading={isLoading}
          />
        </TableBlock>
      </TableZone>
    </WorkspaceWrapper>
  )
}

export default Casademont

const TableZone = styled.div``

const TableBlock = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
  gap: 10px;
  margin-bottom: 64px;
`
