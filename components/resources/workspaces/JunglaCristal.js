import { styled } from '@mui/material/styles'
import dayjs from 'dayjs'

import WorkspaceWrapper from '@components/resources/WorkspaceWrapper'
import TableResource, { MeetingRoom } from '@components/resources/TableResource'
import { Box } from '@mui/system'

import useResourceDialog from '@components/resources/ResourceDialog'

const JunglaCristal = (props) => {
  const { resources, events, isLoading, reloadResources, date, name, place } =
    props

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
      name={name}
      place={place}>
      <Box sx={{ width: '50%', paddingRight: '32px' }}>
        <TableBlock>
          <TableResource name="JUNGLA_IT_1" {...tableProps} />
          <TableResource name="JUNGLA_IT_2" {...tableProps} />
          <TableResource name="JUNGLA_IT_3" {...tableProps} />
          <TableResource name="JUNGLA_IT_4" {...tableProps} />
        </TableBlock>

        <TableBlock>
          <TableResource name="JUNGLA_IT_5" {...tableProps} />
          <TableResource name="JUNGLA_IT_6" {...tableProps} />
          <TableResource name="JUNGLA_T1" {...tableProps} />
          <TableResource name="JUNGLA_T2" {...tableProps} />
        </TableBlock>

        <TableBlock>
          <TableResource name="JUNGLA_T3" {...tableProps} />
          <TableResource name="JUNGLA_T4" {...tableProps} />
          <TableResource name="JUNGLA_T5" {...tableProps} />
          <TableResource name="JUNGLA_T6" {...tableProps} />
        </TableBlock>

        <TableBlock>
          <TableResource name="JUNGLA_T7" {...tableProps} />
          <TableResource name="JUNGLA_T8" {...tableProps} />
          <TableResource name="JUNGLA_T9" {...tableProps} />
          <TableResource name="JUNGLA_T10" {...tableProps} />
        </TableBlock>
      </Box>
      <Box
        sx={{
          width: '45%',
          display: 'grid',
          gridTemplateRows: '1fr 1fr 2fr',
          gap: '10px'
        }}>
        <MeetingRoom name="JUNGLA_MAGATZEM" />
        <MeetingRoom name="JUNGLA_SALA_TV" />
        <Box>
          <TableBlockLine>
            <TableResource name="JUNGLA_T11" {...tableProps} />
            <TableResource name="JUNGLA_T12" {...tableProps} />
          </TableBlockLine>
          <TableBlock>
            <TableResource name="JUNGLA_T13" {...tableProps} />
            <TableResource name="JUNGLA_T14" {...tableProps} />
            <TableResource name="JUNGLA_T15" {...tableProps} />
            <Box />

            <TableResource name="JUNGLA_T16" {...tableProps} />

            <TableResource name="JUNGLA_T17" {...tableProps} />
          </TableBlock>
        </Box>
      </Box>
    </WorkspaceWrapper>
  )
}

export default JunglaCristal

const TableBlock = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
  margin-bottom: 64px;
`

const TableBlockLine = styled(TableBlock)`
  grid-template-rows: 1fr;
`
