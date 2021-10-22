import React, {useState} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import GraphObject from '../StorageModel/GraphObject';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import './Editor/Editor.css';

// Wrap the Delete Icon in the Datagrid classes for styling.
// Think about a better approach if this function is revisited in the future.
function DgDeleteIcon({className:passedClasses, ...props}) {
  return (
    <div className="MuiDataGrid-toolbarContainer">
      <div className="MuiButton-textPrimary MuiButton-textSizeSmall">
        <DeleteIcon {...props} />
      </div>
    </div>
  )
}

function CustomToolbar({deleteHandler}) {
  return (
    <div style={{display:"flex", justifyContent:"space-between"}}>
      <GridToolbar />
      <DgDeleteIcon  onClick={deleteHandler}/>
    </div>
  );
}

// Removes rows based on the provided array of datetimes.
function removeByDatetime(removeDatetimes, rows) {
  const removeSet = new Set(removeDatetimes);
  return rows.filter(r => !removeSet.has(r.datetime));
}

// TODO: Should `setGraphObject`  save to storage?, or should it be done here? Leaning toward here
//   Reason: Confirmations and potential transformations, might make rolling back easier in the future.
//   Counter: Why should this component know what a graphObject is?
function Editor({ graphObject, setGraphObject, saveToStorage }) {

  // state
  const [selectionModel, setSelectionModel] = useState([]);

  const align = { headerAlign: 'center', align: 'center'};
  const editable = { editable: true}
  const columns = [
    { field: 'datetime', headerName: 'Datetime Stamp', width: 220,...editable, ...align },
    { field: 'number', headerName: 'Value', width: 150, ...editable, ...align}
  ];
  const rows = graphObject.data;


  const deleteHandler = () => {
    if(window.confirm(`Delete ${selectionModel.length} rows?`)) {
      const remainingRows = removeByDatetime(selectionModel, rows);
      const newGraphObject = new GraphObject(graphObject.name, remainingRows);
      setGraphObject(newGraphObject);
      saveToStorage(graphObject.name, remainingRows);
    }
  }

  // Since the toolbar is passed as a bare component
  // Use a HOC leveraging closure to add our delete handler
  const withDeleteHandler = Component => ({...props}) => (<Component deleteHandler={deleteHandler} {...props}/>);
  const ToolBarWrapper = withDeleteHandler(CustomToolbar);

  return (
    // TODO: Figure out where to style (theme, css, but probably not here)
    <div style={{ height: 600, width: '90%', margin: 'auto' }}>
      <h3>{graphObject.name}</h3>
      <DataGrid
        rows={rows}
        getRowId={r => r.datetime}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={setSelectionModel}
        components={{
          Toolbar: ToolBarWrapper,
        }}
      />
    </div>
  )
}

export default Editor;
