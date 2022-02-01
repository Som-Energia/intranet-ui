import { styled } from '@mui/material/styles'
import dayjs from 'dayjs'

import WorkspaceWrapper from '@components/resources/WorkspaceWrapper'
import TableResource from '@components/resources/TableResource'
import { MeetingRoom } from '../TableResource'

import useResourceDialog from '@components/resources/ResourceDialog'

const Txernobil = (props) => {
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
      <Wrapper>
        <Space>
          <Llegenda>Entrada principal</Llegenda>

          <TableZone>
            <TableBlock>
              <TableResource name="TXERNO_T1" {...tableProps} />
              <TableResource name="TXERNO_T2" {...tableProps} />
            </TableBlock>

            <TableBlock>
              <TableResource name="TXERNO_T3" {...tableProps} />
              <TableResource name="TXERNO_T4" {...tableProps} />
            </TableBlock>

            <TableBlock>
              <TableResource name="TXERNO_T5" {...tableProps} />
              <TableResource name="TXERNO_T6" {...tableProps} />
            </TableBlock>

            <TableBlock>
              <TableResource name="TXERNO_T7" {...tableProps} />
              <TableResource name="TXERNO_T8" {...tableProps} />
            </TableBlock>
          </TableZone>
          <TableZoneCenter>
            <TableBlockCenter>
              <TableResource name="TXERNO_T9" {...tableProps} />
              <TableResource name="TXERNO_T10" {...tableProps} />
              <TableResource name="TXERNO_T11" {...tableProps} />
              <TableResource name="TXERNO_T12" {...tableProps} />
              <TableResource name="TXERNO_T13" {...tableProps} />

              <TableResource name="TXERNO_T14" {...tableProps} />
            </TableBlockCenter>

            <TableBlockCenter>
              <TableResource name="TXERNO_T15" {...tableProps} />
              <TableResource name="TXERNO_T16" {...tableProps} />
              <TableResource name="TXERNO_T17" {...tableProps} />
              <TableResource name="TXERNO_T18" {...tableProps} />
              <TableResource name="TXERNO_T19" {...tableProps} />

              <TableResource name="TXERNO_T20" {...tableProps} />
            </TableBlockCenter>

            <TableBlockCenter>
              <TableResource name="TXERNO_T21" {...tableProps} />
              <TableResource name="TXERNO_T22" {...tableProps} />
              <TableResource name="TXERNO_T23" {...tableProps} />
              <TableResource name="TXERNO_T24" {...tableProps} />
              <TableResource name="TXERNO_T25" {...tableProps} />

              <TableResource name="TXERNO_T26" {...tableProps} />
            </TableBlockCenter>

            <TableBlockCenter>
              <TableResource name="TXERNO_T27" {...tableProps} />
              <TableResource name="TXERNO_T28" {...tableProps} />
              <TableResource name="TXERNO_T29" {...tableProps} />
              <TableResource name="TXERNO_T30" {...tableProps} />
              <TableResource name="TXERNO_T31" {...tableProps} />

              <TableResource name="TXERNO_T32" {...tableProps} />
            </TableBlockCenter>

            <TableBlockCenter>
              <TableResource name="TXERNO_T33" {...tableProps} />
              <TableResource name="TXERNO_T34" {...tableProps} />
              <TableResource name="TXERNO_T35" {...tableProps} />
              <TableResource name="TXERNO_T36" {...tableProps} />
              <TableResource name="TXERNO_T37" {...tableProps} />

              <TableResource name="TXERNO_T38" {...tableProps} />
            </TableBlockCenter>
          </TableZoneCenter>
          <TableZone>
            <TableBlockRight>
              <TableResource name="TXERNO_T39" {...tableProps} />
              <TableResource name="TXERNO_T40" {...tableProps} />
              <TableResource name="TXERNO_T41" {...tableProps} />
              <TableResource name="TXERNO_T42" {...tableProps} />
            </TableBlockRight>
            <TableBlockRight>
              <TableResource name="TXERNO_T43" {...tableProps} />
              <TableResource name="TXERNO_T44" {...tableProps} />
              <TableResource name="TXERNO_T45" {...tableProps} />
              <TableResource name="TXERNO_T46" {...tableProps} />
            </TableBlockRight>
            <TableBlockRight>
              <TableResource name="TXERNO_T47" {...tableProps} />
              <TableResource name="TXERNO_T48" {...tableProps} />
              <TableResource name="TXERNO_T49" {...tableProps} />
              <TableResource name="TXERNO_T50" {...tableProps} />
            </TableBlockRight>
            <TableBlockRight>
              <TableResource name="TXERNO_T51" {...tableProps} />
              <TableResource name="TXERNO_T52" {...tableProps} />
              <TableResource name="TXERNO_T53" {...tableProps} />
              <TableResource name="TXERNO_T54" {...tableProps} />
            </TableBlockRight>
            <TableBlockRight>
              <TableResource name="TXERNO_T55" {...tableProps} />
              <TableResource name="TXERNO_T56" {...tableProps} />
              <TableResource name="TXERNO_T57" {...tableProps} />
              <TableResource name="TXERNO_T58" {...tableProps} />
            </TableBlockRight>
            <TableBlockRight>
              <TableResource name="TXERNO_T59" {...tableProps} />
              <TableResource name="TXERNO_T60" {...tableProps} />
              <TableResource name="TXERNO_T61" {...tableProps} />
              <TableResource name="TXERNO_T62" {...tableProps} />
            </TableBlockRight>
            <TableBlockRight>
              <TableResource name="TXERNO_T63" {...tableProps} />
              <TableResource name="TXERNO_T64" {...tableProps} />
              <TableResource name="TXERNO_T65" {...tableProps} />
              <TableResource name="TXERNO_T66" {...tableProps} />
            </TableBlockRight>
          </TableZone>
        </Space>
        <ExtraSpace>
          <div></div>
          <TableZoneExtra>
            <TableBlockRight>
              <TableResource name="TXERNO_T67" {...tableProps} />
              <TableResource name="TXERNO_T68" {...tableProps} />
              <TableResource name="TXERNO_T69" {...tableProps} />
              <TableResource name="TXERNO_T70" {...tableProps} />
            </TableBlockRight>

            <TableBlockRight>
              <TableResource name="TXERNO_T71" {...tableProps} />
              <TableResource name="TXERNO_T72" {...tableProps} />
              <TableResource name="TXERNO_T73" {...tableProps} />
              <TableResource name="TXERNO_T74" {...tableProps} />
            </TableBlockRight>
            <MeetingRoom
              sx={{
                gridColumnStart: 1,
                gridColumnEnd: 3,
                height: '260px',
                gridRowEnd: 5
              }}
              name="SALA_POLIVALENT"
            />
          </TableZoneExtra>
          <div></div>
        </ExtraSpace>
      </Wrapper>
    </WorkspaceWrapper>
  )
}

export default Txernobil

const Llegenda = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  font-weight: 500;
`

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Space = styled('div')`
  position: relative;
  display: grid;
  grid-template-columns: 0.6fr 2.15fr 1.25fr;
  gap: 10px;
`

const ExtraSpace = styled('div')`
  display: grid;
  grid-template-columns: 0.6fr 2.15fr 1.25fr;
  gap: 10px;
`

const TableZone = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const TableZoneCenter = styled(TableZone)`
  border-left: 1px solid rgba(0, 0, 0, 0.14);
  border-right: 1px solid rgba(0, 0, 0, 0.14);
`

const TableZoneExtra = styled(TableZoneCenter)`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  padding: 16px 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.14);
`

const TableBlock = styled('div')`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 4px;
  margin-bottom: 48px;
`

const TableBlockRight = styled(TableBlock)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  margin-bottom: 32px;
  padding-left: 8px;
`

const TableBlockCenter = styled(TableBlock)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  padding: 0;
  padding-left: 8px;
  padding-right: 8px;
`
