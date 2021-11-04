import React, { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import GraphObject from '../StorageModel/GraphObject';
import { AppBar } from '@mui/material';
import NavBar from './NavBar';
import Graphit, { GraphitProps } from './Graphit';
import About from './About';
import Editor, { EditorProps } from './Editor';
import {
  GraphEntryHandler,
  GraphHandler,
  ISODatetimeType,
  JustGraphitEntry,
} from '../JustGraphitTypes';
import Storage from '../StorageModel/Storage';

export type AppRouterProps = {
  storage: Storage;
};

function AppRouter({ storage }: AppRouterProps): JSX.Element {
  const initialObject = storage.getInitialObject();

  // state
  const [graphObject, setGraphObject] = useState(
    GraphObject.fromPlainObject(initialObject)
  );
  const [graphNameList, setGraphNameList] = useState(storage.getAllKeys());

  // CRUD-like handlers
  const changeSelectedGraph: GraphHandler = (graphName) => {
    const newGraphData = storage.load(graphName);
    const newGraphObject = new GraphObject(graphName, newGraphData);
    setGraphObject(newGraphObject);
  };

  const addNewNumber: GraphEntryHandler = (graphName, newNumberInput) => {
    const number = parseFloat(newNumberInput);
    const datetime: ISODatetimeType =
      new Date().toISOString() as ISODatetimeType;
    const newEntry: JustGraphitEntry = { number, datetime };
    let newGraphData: JustGraphitEntry[] = [...graphObject.data, newEntry];
    // If we get a new graphName, create a new object
    if (graphName !== graphObject.name) {
      newGraphData = [newEntry];
      setGraphNameList([...graphNameList, graphName]);
    }
    const newGraphObject: GraphObject = new GraphObject(
      graphName,
      newGraphData
    );
    storage.save(graphName, newGraphData);
    setGraphObject(newGraphObject);
  };

  const deleteGraph: GraphHandler = (graphName) => {
    if (window.confirm('Delete Graph?')) {
      storage.deleteObject(graphName);
      const lastName = storage.getInitialKey();
      const lastData = storage.load(lastName);
      const newGraphObject = new GraphObject(lastName, lastData);
      setGraphObject(newGraphObject);
      setGraphNameList(storage.getAllKeys());
    }
  };

  // props
  const graphItProps: GraphitProps = {
    graphObject,
    addNewNumber,
    changeSelectedGraph,
    deleteGraph,
    graphNameList,
  };

  const editorProps: EditorProps = {
    graphObject,
    setGraphObject,
    saveToStorage: storage.save,
  };

  return (
    <HashRouter>
      <AppBar title="JustGraphIt" />
      <NavBar />
      <Routes>
        <Route path="/" element={<Graphit {...graphItProps} />} />
        <Route path="/about" element={<About />} />
        <Route path="/edit" element={<Editor {...editorProps} />} />
      </Routes>
    </HashRouter>
  );
}

export default AppRouter;
