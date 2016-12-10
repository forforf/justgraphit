
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Container from './app_header/Container';
import Graphit from './pages/Graphit/Graphit';
import About from './pages/About/About';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router history={hashHistory}>
          <Route path="/" component={Container}>
            <IndexRoute component={Graphit}/>
            <Route path="/about" component={About}/>
          </Route>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
