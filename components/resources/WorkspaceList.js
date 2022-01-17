import { Grid } from '@mui/material'
import WorkspaceItem from '@components/resources/WorkspaceItem'

const WorkspaceList = ({ workspaces }) => {
  return (
    <>
      <Grid container spacing={3}>
        {workspaces.map((workspace, index) => (
          <Grid key={index} item xs={12} sm={3}>
            <WorkspaceItem {...workspace} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default WorkspaceList
