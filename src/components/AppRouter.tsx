import React, { useState } from 'react';
import { HashRouter, Route } from 'react-router-dom';
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

function makePropless<T>(Component: React.ComponentType, componentProps: T) {
  function Propless(routerProps: unknown) {
    return <Component {...componentProps} {...routerProps} />;
  }

  Propless.displayName = `Propless(${Component.displayName || Component.name})`;
  return Propless;
}

function AppRouter({ storage }: AppRouterProps): JSX.Element {
  // const lastObject = storage.getLastStorageObject();
  const initialObject = storage.getInitialObject();

  // state
  const [graphObject, setGraphObject] = useState(
    GraphObject.fromPlainObject(initialObject)
  );
  const [graphNameList, setGraphNameList] = useState(storage.getAllKeys());

  // CRUD-like handlers
  const changeSelectedGraph: GraphHandler = (graphName) => {
    const newGraphData = storage.load(graphName);
    // storage.updateHistory(graphName)
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
      // Load last saved graph
      const lastName = storage.getInitialKey();
      const lastData = storage.load(lastName);
      const newGraphObject = new GraphObject(lastName, lastData);
      setGraphObject(newGraphObject);
      setGraphNameList(storage.getAllKeys());
    }
  };

  // props
  const graphItProps = {
    graphObject,
    addNewNumber,
    changeSelectedGraph,
    deleteGraph,
    graphNameList,
  };

  const editorProps = {
    graphObject,
    setGraphObject,
    saveToStorage: storage.save,
  };

  return (
    <HashRouter>
      <AppBar title="JustGraphIt" />
      <NavBar />
      <Route
        exact
        path="/"
        component={makePropless<GraphitProps>(Graphit as React.ComponentType, {
          ...graphItProps,
        })}
      />
      <Route exact path="/about" component={About} />
      <Route
        exact
        path="/edit"
        component={makePropless<EditorProps>(Editor as React.ComponentType, {
          ...editorProps,
        })}
      />
    </HashRouter>
  );
}

export default AppRouter;
