import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import GraphObject from '../StorageModel/GraphObject';
import {
  GraphName,
  ISODatetimeType,
  JustGraphitEntry,
} from '../JustGraphitTypes';
import {
  DataGrid,
  GridAlignment,
  GridColDef,
  GridRowModel,
  GridSelectionModel,
  GridToolbar,
} from '@mui/x-data-grid';
import './Editor/Editor.css';

// Wrap the Delete Icon in the Datagrid classes for styling.
// Think about a better approach if this function is revisited in the future.
function DgDeleteIcon({ ...props }) {
  return (
    <div className="MuiDataGrid-toolbarContainer">
      <div className="MuiButton-textPrimary MuiButton-textSizeSmall">
        <DeleteIcon {...props} />
      </div>
    </div>
  );
}

type CustomToolbarProps = {
  deleteHandler: () => void;
};

function CustomToolbar({ deleteHandler }: CustomToolbarProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <GridToolbar />
      <DgDeleteIcon onClick={deleteHandler} />
    </div>
  );
}

// Removes rows based on the provided array of datetimes.
function removeByDatetime(
  removeDatetimes: ISODatetimeType[],
  rows: JustGraphitEntry[]
) {
  const removeSet = new Set(removeDatetimes);
  return rows.filter((r) => !removeSet.has(r.datetime));
}

export type EditorProps = {
  graphObject: GraphObject;
  setGraphObject: (g: GraphObject) => void;
  saveToStorage: (gn: GraphName, r: JustGraphitEntry[]) => void;
};
// TODO: Should `setGraphObject` save to storage internally?,
//  or should saving to storage be done here? Leaning toward here
//   Reason: Confirmations and potential transformations, might make rolling back easier in the future.
//   Counter: Why should this component know what a graphObject is?
function Editor({
  graphObject,
  setGraphObject,
  saveToStorage,
}: EditorProps): JSX.Element {
  // state
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  const align = {
    headerAlign: 'center' as GridAlignment,
    align: 'center' as GridAlignment,
  };
  const editable = { editable: true };
  const columns: GridColDef[] = [
    {
      field: 'datetime',
      headerName: 'Datetime Stamp',
      width: 220,
      ...editable,
      ...align,
    },
    { field: 'number', headerName: 'Value', width: 150, ...editable, ...align },
  ];
  const rows = graphObject.data;

  const deleteHandler = () => {
    if (window.confirm(`Delete ${selectionModel.length} rows?`)) {
      const remainingRows = removeByDatetime(
        selectionModel as ISODatetimeType[],
        rows
      );
      const newGraphObject = new GraphObject(graphObject.name, remainingRows);
      setGraphObject(newGraphObject);
      saveToStorage(graphObject.name, remainingRows);
    }
  };

  const processRowUpdate = React.useCallback(
      (newRow: GridRowModel) => {
        console.log('nr', newRow)
        // TODO: Dry with deleteHandler and see if it can be simplified
        const newGraphRows = rows.map( r => {
          if (r.datetime == newRow.datetime) {
            const {number, datetime, dt} = newRow
            return {number, datetime, dt}
          }
          return r
        })
        const newGraphObject = new GraphObject(graphObject.name, newGraphRows);
        setGraphObject(newGraphObject);
        saveToStorage(graphObject.name, newGraphRows);
        return newRow
      },
      [graphObject.name, rows, saveToStorage, setGraphObject],
  );

  const handleProcessRowUpdateError = React.useCallback((error: Error) => {
    console.error(error);
  }, []);

  type WithDeleteProps = {
    deleteHandler: () => void;
  };

  // Since the toolbar is passed as a bare component (no props)
  // Use a HOC leveraging closure to add our delete handler
  const withDeleteHandler = function ComponentWrapper(
    Component: React.FC<WithDeleteProps>
  ) {
    return function WithDeleteHandler({ ...props }) {
      return <Component deleteHandler={deleteHandler} {...props} />;
    };
  };
  const ToolBarWrapper = withDeleteHandler(CustomToolbar);

  return (
    // TODO: Figure out where to style (theme, css, but probably not here)
    <div style={{ height: 600, width: '90%', margin: 'auto' }}>
      <h3>{graphObject.name}</h3>
      <DataGrid experimentalFeatures={{ newEditingApi: true }}
        rows={rows}
        getRowId={(r) => r.datetime}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={setSelectionModel}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        components={{
          Toolbar: ToolBarWrapper,
        }}
      />
    </div>
  );
}

export default Editor;
