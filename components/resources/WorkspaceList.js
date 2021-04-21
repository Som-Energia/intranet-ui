import { Grid } from '@material-ui/core'

import WorkspaceItem from '@/components/resources/WorkspaceItem'

import { resources } from '@/lib/resources'

const WorkspaceList = () => {
  return (
    <>
      <Grid container spacing={3}>
        {resources.map((resource, index) => (
          <Grid key={index} item xs={6} sm={3}>
            <WorkspaceItem {...resource} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default WorkspaceList
