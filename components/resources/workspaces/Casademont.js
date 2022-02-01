import styled from 'styled-components'

import WorkspaceWrapper from '@components/resources/WorkspaceWrapper'
import TableResource from '@components/resources/TableResource'

import useResourceDialog from '@components/resources/ResourceDialog'
import dayjs from 'dayjs'

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

  const isDayGone = dayjs().isAfter(date, 'day')

  const tableProps = {
    resources: resources,
    events: events,
    isLoading: isLoading,
    onClick: openDialog,
    disabled: isDayGone
  }

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
          <TableResource name="" {...tableProps} />
          <TableResource name="UPPERCASADEMONT23_T1" {...tableProps} />
          <TableResource name="UPPERCASADEMONT23_T3" {...tableProps} />
          <TableResource name="" {...tableProps} />
        </TableBlock>

        <TableBlock>
          <TableResource
            name=""
            resources={resources}
            events={events}
            isLoading={isLoading}
          />
          <TableResource name="UPPERCASADEMONT23_T5" {...tableProps} />
          <TableResource name="UPPERCASADEMONT23_T7" {...tableProps} />
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
          <TableResource name="UPPERCASADEMONT23_T9" {...tableProps} />
          <TableResource name="UPPERCASADEMONT23_T11" {...tableProps} />
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
          <TableResource name="UPPERCASADEMONT23_T2" {...tableProps} />
          <TableResource name="UPPERCASADEMONT23_T4" {...tableProps} />
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
          <TableResource name="UPPERCASADEMONT23_T6" {...tableProps} />
          <TableResource name="UPPERCASADEMONT23_T8" {...tableProps} />
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
          <TableResource name="UPPERCASADEMONT23_T12" {...tableProps} />
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
