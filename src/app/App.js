
import React, { Component } from 'react';
import MuiThemeProvider from '../../node_modules/material-ui/styles/MuiThemeProvider';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Storage from 'StorageModel/Storage'

import Container from './header/Container';
import Graphit   from './pages/Graphit/Graphit';
import About     from './pages/About/About';
import Editor    from './pages/Editor/Editor';


class App extends Component {

  constructor(props) {
    super(props);
    const initialObject = { "my first graph": [] };
    const storage = new Storage(initialObject);
    this.state = {
      storage: storage
    };
  }
  
  render() {
    const GraphItWrapper = (props) => {
      return <Graphit storage={this.state.storage}/>;
    };
    
    const EditorWrapper = (props) => {
      return <Editor storage={this.state.storage}/>;
    };

    return (
      <MuiThemeProvider>
        <Router history={hashHistory}>
          <Route path="/" component={Container}>
            <IndexRoute component={GraphItWrapper}/>
            <Route path="/about" component={About}/>
            <Route path="/edit" component={EditorWrapper}/>
          </Route>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
