import { useState } from 'react'

const useResourceDialog = () => {
  const [selectedResource, setSelectedResource] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(false)

  const openDialog = (resource, event = false) => {
    setSelectedResource(resource)
    event && setSelectedEvent(event)
    console.log('event', event)
  }

  const closeDialog = () => {
    setSelectedResource(false)
    setSelectedEvent(false)
  }

  return [selectedResource, selectedEvent, openDialog, closeDialog]
}

export default useResourceDialog
