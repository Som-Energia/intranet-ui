import React, { useState, useEffect } from 'react'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'

import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const EditMenu = (props) => {
  const {
    onEdit = false,
    onAdd = false,
    onDelete = false,
    customize = {}
  } = props
  const [anchorEl, setAnchorEl] = useState(null)
  const [activeItems, setActiveItems] = useState([])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    const filteredItems = [onAdd, onEdit, onDelete].filter(
      (item) => item !== false
    )
    setActiveItems(filteredItems)
  }, [onAdd, onEdit, onDelete])

  return (
    <>
      {activeItems.length !== 1 ? (
        <IconButton aria-label="settings" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
      ) : (
        <>
          {onAdd !== false && (
            <IconButton onClick={() => handleClose() & onAdd()}>
              <AddIcon />
            </IconButton>
          )}
          {onEdit !== false && (
            <IconButton onClick={() => handleClose() & onEdit()}>
              <EditIcon />
            </IconButton>
          )}
          {onDelete !== false && (
            <IconButton onClick={() => handleClose() & onDelete()}>
              <DeleteIcon />
            </IconButton>
          )}
        </>
      )}
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        {onAdd !== false && (
          <MenuItem onClick={() => handleClose() & onAdd()}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>{' '}
            {customize?.add ? customize?.add : 'Afegir'}
          </MenuItem>
        )}
        {onEdit !== false && (
          <MenuItem onClick={() => handleClose() & onEdit()}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>{' '}
            {customize?.edit ? customize?.edit : 'Editar'}
          </MenuItem>
        )}
        {onDelete !== false && (
          <MenuItem onClick={() => handleClose() & onDelete()}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>{' '}
            {customize?.delete ? customize?.delete : 'Eliminar'}
          </MenuItem>
        )}
      </Menu>
    </>
  )
}

export default EditMenu
