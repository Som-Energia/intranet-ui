import { styled } from '@mui/material/styles'

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
              <TableResource
                name="TXERNO_T1"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T2"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
            </TableBlock>

            <TableBlock>
              <TableResource
                name="TXERNO_T3"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T4"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
            </TableBlock>

            <TableBlock>
              <TableResource
                name="TXERNO_T5"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T6"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
            </TableBlock>

            <TableBlock>
              <TableResource
                name="TXERNO_T7"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T8"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
            </TableBlock>
          </TableZone>
          <TableZoneCenter>
            <TableBlockCenter>
              <TableResource
                name="TXERNO_T9"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T10"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T11"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T12"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T13"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />

              <TableResource
                name="TXERNO_T14"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
            </TableBlockCenter>

            <TableBlockCenter>
              <TableResource
                name="TXERNO_T15"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T16"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T17"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T18"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T19"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />

              <TableResource
                name="TXERNO_T20"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
            </TableBlockCenter>

            <TableBlockCenter>
              <TableResource
                name="TXERNO_T21"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T22"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T23"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T24"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T25"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />

              <TableResource
                name="TXERNO_T26"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
            </TableBlockCenter>

            <TableBlockCenter>
              <TableResource
                name="TXERNO_T27"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T28"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T29"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T30"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T31"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />

              <TableResource
                name="TXERNO_T32"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
            </TableBlockCenter>

            <TableBlockCenter>
              <TableResource
                name="TXERNO_T33"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T34"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T35"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T36"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T37"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />

              <TableResource
                name="TXERNO_T38"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
            </TableBlockCenter>
          </TableZoneCenter>
          <TableZone>
            <TableBlockRight>
              <TableResource
                name="TXERNO_T39"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T40"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T41"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T42"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
            </TableBlockRight>
            <TableBlockRight>
              <TableResource
                name="TXERNO_T43"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T44"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T45"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T46"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
            </TableBlockRight>
            <TableBlockRight>
              <TableResource
                name="TXERNO_T47"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T48"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T49"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T50"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
            </TableBlockRight>
            <TableBlockRight>
              <TableResource
                name="TXERNO_T51"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T52"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T53"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T54"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
            </TableBlockRight>
            <TableBlockRight>
              <TableResource
                name="TXERNO_T55"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T56"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T57"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T58"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
            </TableBlockRight>
            <TableBlockRight>
              <TableResource
                name="TXERNO_T59"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T60"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T61"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T62"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
            </TableBlockRight>
            <TableBlockRight>
              <TableResource
                name="TXERNO_T63"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T64"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T65"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T66"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
            </TableBlockRight>
          </TableZone>
        </Space>
        <ExtraSpace>
          <div></div>
          <TableZoneExtra>
            <TableBlockRight>
              <TableResource
                name="TXERNO_T67"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T68"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T69"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T70"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
            </TableBlockRight>

            <TableBlockRight>
              <TableResource
                name="TXERNO_T71"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T72"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T73"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
              <TableResource
                name="TXERNO_T74"
                resources={resources}
                events={events}
                isLoading={isLoading}
                onClick={openDialog}
              />
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
