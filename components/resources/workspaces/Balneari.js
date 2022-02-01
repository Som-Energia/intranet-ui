import { styled } from '@mui/material/styles'
import dayjs from 'dayjs'

import TableResource, { MeetingRoom } from '@components/resources/TableResource'
import WorkspaceWrapper from '@components/resources/WorkspaceWrapper'

import useResourceDialog from '@components/resources/ResourceDialog'

const Balneari = (props) => {
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
      <MeetingRooms>
        <MeetingRoom name="BALNEARI_SALA" sx={{ height: '350px' }} />
      </MeetingRooms>

      <TableZone>
        <TableRow>
          <TableBlock>
            <TableResource name="BALNEARI_T1" {...tableProps} />
            <TableResource name="" {...tableProps} />
            <TableResource name="" {...tableProps} />
            <TableResource name="BALNEARI_T2" {...tableProps} />
          </TableBlock>

          <TableBlock>
            <TableResource name="BALNEARI_T3" {...tableProps} />
            <TableResource name="" {...tableProps} />
            <TableResource name="" {...tableProps} />
            <TableResource name="BALNEARI_T4" {...tableProps} />
          </TableBlock>
        </TableRow>

        <MidTableRow>
          <TableBlock>
            <TableResource name="" {...tableProps} />
            <TableResource name="BALNEARI_T5" {...tableProps} />
            <TableResource name="BALNEARI_T7" {...tableProps} />
            <TableResource name="" {...tableProps} />
          </TableBlock>

          <TableBlock>
            <TableResource name="" {...tableProps} />
            <TableResource name="BALNEARI_T6" {...tableProps} />
            <TableResource name="BALNEARI_T8" {...tableProps} />
            <TableResource name="" {...tableProps} />
          </TableBlock>
        </MidTableRow>

        <TableRow>
          <TableBlock>
            <TableResource name="BALNEARI_T9" {...tableProps} />
            <TableResource name="" {...tableProps} />
            <TableResource name="" {...tableProps} />
            <TableResource name="BALNEARI_T11" {...tableProps} />
          </TableBlock>

          <TableBlock>
            <TableResource name="" {...tableProps} />
            <TableResource name="BALNEARI_T10" {...tableProps} />
            <TableResource name="BALNEARI_T12" {...tableProps} />
            <TableResource name="" {...tableProps} />
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
