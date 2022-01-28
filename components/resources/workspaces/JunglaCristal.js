import { styled } from '@mui/material/styles'

import WorkspaceWrapper from '@components/resources/WorkspaceWrapper'
import TableResource, { MeetingRoom } from '@components/resources/TableResource'
import { Box } from '@mui/system'

import useResourceDialog from '@components/resources/ResourceDialog'

const JunglaCristal = (props) => {
  const { resources, events, isLoading, reloadResources, date, name, place } =
    props

  const [selectedResource, selectedEvent, openDialog, closeDialog] =
    useResourceDialog()

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
          <TableResource
            name="JUNGLA_IT_1"
            resources={resources}
            events={events}
            isLoading={isLoading}
            onClick={openDialog}
          />
          <TableResource
            name="JUNGLA_IT_2"
            resources={resources}
            events={events}
            isLoading={isLoading}
            onClick={openDialog}
          />
          <TableResource
            name="JUNGLA_IT_3"
            resources={resources}
            events={events}
            isLoading={isLoading}
            onClick={openDialog}
          />
          <TableResource
            name="JUNGLA_IT_4"
            resources={resources}
            events={events}
            isLoading={isLoading}
            onClick={openDialog}
          />
        </TableBlock>

        <TableBlock>
          <TableResource
            name="JUNGLA_IT_5"
            resources={resources}
            events={events}
            isLoading={isLoading}
            onClick={openDialog}
          />
          <TableResource
            name="JUNGLA_IT_6"
            resources={resources}
            events={events}
            isLoading={isLoading}
            onClick={openDialog}
          />
          <TableResource
            name="JUNGLA_T1"
            resources={resources}
            events={events}
            isLoading={isLoading}
            onClick={openDialog}
          />
          <TableResource
            name="JUNGLA_T2"
            resources={resources}
            events={events}
            isLoading={isLoading}
            onClick={openDialog}
          />
        </TableBlock>

        <TableBlock>
          <TableResource
            name="JUNGLA_T3"
            resources={resources}
            events={events}
            isLoading={isLoading}
            onClick={openDialog}
          />
          <TableResource
            name="JUNGLA_T4"
            resources={resources}
            events={events}
            isLoading={isLoading}
            onClick={openDialog}
          />
          <TableResource
            name="JUNGLA_T5"
            resources={resources}
            events={events}
            isLoading={isLoading}
            onClick={openDialog}
          />
          <TableResource
            name="JUNGLA_T6"
            resources={resources}
            events={events}
            isLoading={isLoading}
            onClick={openDialog}
          />
        </TableBlock>

        <TableBlock>
          <TableResource
            name="JUNGLA_T7"
            resources={resources}
            events={events}
            isLoading={isLoading}
            onClick={openDialog}
          />
          <TableResource
            name="JUNGLA_T8"
            resources={resources}
            events={events}
            isLoading={isLoading}
            onClick={openDialog}
          />
          <TableResource
            name="JUNGLA_T9"
            resources={resources}
            events={events}
            isLoading={isLoading}
            onClick={openDialog}
          />
          <TableResource
            name="JUNGLA_T10"
            resources={resources}
            events={events}
            isLoading={isLoading}
            onClick={openDialog}
          />
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
            <TableResource
              name="JUNGLA_T11"
              resources={resources}
              events={events}
              isLoading={isLoading}
              onClick={openDialog}
            />
            <TableResource
              name="JUNGLA_T12"
              resources={resources}
              events={events}
              isLoading={isLoading}
              onClick={openDialog}
            />
          </TableBlockLine>
          <TableBlock>
            <TableResource
              name="JUNGLA_T13"
              resources={resources}
              events={events}
              isLoading={isLoading}
              onClick={openDialog}
            />
            <TableResource
              name="JUNGLA_T14"
              resources={resources}
              events={events}
              isLoading={isLoading}
              onClick={openDialog}
            />
            <TableResource
              name="JUNGLA_T15"
              resources={resources}
              events={events}
              isLoading={isLoading}
              onClick={openDialog}
            />
            <Box />

            <TableResource
              name="JUNGLA_T16"
              resources={resources}
              events={events}
              isLoading={isLoading}
              onClick={openDialog}
            />

            <TableResource
              name="JUNGLA_T17"
              resources={resources}
              events={events}
              isLoading={isLoading}
              onClick={openDialog}
            />
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
