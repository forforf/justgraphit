
import React, { Component } from 'react';
import MuiThemeProvider from '../../node_modules/material-ui/styles/MuiThemeProvider';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Storage from 'StorageModel/Storage'

import Container from './header/Container';
import Graphit from './pages/Graphit/Graphit';
import About from './pages/About/About';



// const GraphItWrapper = (props) => <Graphit currentGraph={this.state.currentGraph} />;

class App extends Component {

  constructor(props) {
    super(props);
    const storage = new Storage();

    // if storage is empty, initialize initial graph
    if (storage.isEmpty()) {
      storage.save("my first graph", []);
    }

    const currentGraphObj = storage.getLastKeyValue();

    this.state = {
      storage: storage,
      currentGraphObj: currentGraphObj
    };
  }

  graphItFactory(props, currentGraph) {
    const GraphItWrapper = (props) => {
     return <Graphit currentGraphObj={this.state.currentGraphObj} />;
    };
    return GraphItWrapper
  }

  render() {
    return (
      <MuiThemeProvider>
        <Router history={hashHistory}>
          <Route path="/" component={Container}>
            <IndexRoute component={this.graphItFactory()}/>
            <Route path="/about" component={About}/>
          </Route>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
