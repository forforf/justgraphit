import React from 'react';
import {ListItem, ListItemIcon, ListItemText} from '@mui/material';


import DeleteIcon from '@mui/icons-material/Delete';
import {GraphHandler, GraphName} from "../../JustGraphitTypes";

export type GraphListItemProps = {
  graphName: GraphName;
  deleteGraph: GraphHandler;
  handleClick: GraphHandler;
}
const GraphListItem = ({graphName, deleteGraph, handleClick}: GraphListItemProps): JSX.Element => {
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
