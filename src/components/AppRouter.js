import React, {useState} from 'react';
import {HashRouter, Route} from 'react-router-dom';
import GraphObject from '../StorageModel/GraphObject';
import {AppBar} from '@mui/material';
import NavBar from './NavBar';
import Graphit from './Graphit';
import About from './About';
import Editor from './Editor';

function makePropless(Component, componentProps) {
  return (() => <Component {...componentProps} />)
}

function AppRouter({storage}) {
  const lastObject = storage.getLastStorageObject();

  // state
  const [graphObject, setGraphObject] = useState(GraphObject.fromPlainObject(lastObject));
  const [graphNameList, setGraphNameList] = useState(storage.getAllKeys());

  // CRUD-like handlers
  const changeSelectedGraph = graphName => {
    const newGraphData = storage.load(graphName);
    storage.updateHistory(graphName)
    const newGraphObject = new GraphObject(graphName, newGraphData)
    setGraphObject(newGraphObject);
  };

  const addNewNumber = (graphName, newNumberInput) => {
    const number = parseFloat(newNumberInput);
    const datetime = new Date().toISOString();
    const newEntry = { number, datetime };
    let newGraphData = [...graphObject.data, newEntry];
    // If we get a new graphName, create a new object
    if (graphName !== graphObject.name) {
      newGraphData = [newEntry];
      setGraphNameList([...graphNameList, graphName]);
    }
    const newGraphObject = new GraphObject(graphName, newGraphData);
    storage.save(graphName, newGraphData);
    setGraphObject(newGraphObject);
  }

  const deleteGraph = graphName => {
    if(window.confirm('Delete Graph?')) {
      storage.deleteObject(graphName);
      // Load last saved graph
      const lastName = storage.getLastKey()
      const lastData = storage.load(lastName);
      const newGraphObject = new GraphObject(lastName, lastData);
      setGraphObject(newGraphObject);
      setGraphNameList(storage.getAllKeys())
    }
  };

  // props
  const graphItProps = {
    graphObject,
    addNewNumber,
    changeSelectedGraph,
    deleteGraph,
    graphNameList
  }

  const editorProps = { graphObject, setGraphObject, saveToStorage: storage.save };

  return (
    <HashRouter>
      <AppBar title="JustGraphIt" />
      <NavBar />
      <Route exact path="/" component={makePropless(Graphit, {...graphItProps})} />
      <Route exact path="/about" component={About} />
      <Route exact path="/edit" component={makePropless(Editor, {...editorProps})} />
    </HashRouter>
  );
}

export default AppRouter
