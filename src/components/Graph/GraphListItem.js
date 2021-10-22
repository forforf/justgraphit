import React from 'react';
import {ListItem, ListItemIcon, ListItemText} from '@mui/material';


import DeleteIcon from '@mui/icons-material/Delete';

const GraphListItem = ({graphName, deleteGraph, handleClick}) => {
  return (
    <ListItem onClick={() => handleClick(graphName)}>
      <ListItemText primary={graphName} />
      <ListItemIcon>
        <DeleteIcon onClick={() => deleteGraph(graphName)} />
      </ListItemIcon>
    </ListItem>
  )
};

export default GraphListItem;
