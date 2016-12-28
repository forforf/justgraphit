
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

    const routeConfig = [
      {
        path:"/",
        component: {Container}
      }
    ]

    this.persistGraphObj = this.persistGraphObj.bind(this);
  }

  persistGraphObj = (name, graphData) => {
    console.log("App this", this.state.storage);
    this.state.storage.save(name, graphData);
    const currentGraphObj = this.state.storage.getLastKeyValue();
    this.setState({currentGraphObj: currentGraphObj});
  };

  graphItFactory(props, currentGraph) {
    const GraphItWrapper = (props) => {
     return <Graphit currentGraphObj={this.state.currentGraphObj} persistGraphObj={this.persistGraphObj}/>;
    };
    return GraphItWrapper
  }

  // const routeConfig = [
  //   { path: '/:locale',
  //     component: App,
  //     indexRoute: { component: NewsCardsContainer },
  //     ...
  //   }
  // ];

  // const routes = {
  //   path: '/',
  //   component: App,
  //   childRoutes: [
  //     { path: '/about', component: About },
  //     {
  //       path: '/posts',
  //       component: Posts,
  //       childRoutes: [ { path: '/post/:nr', component: Post } ]
  //     },
  //     { path: '*', component: NoMatch}
  //   ]
  // };
  //
  // const renderAll = () => {
  //   ReactDOM.render(
  //       (
  //           <Provider store={store}>
  //             <Router history={browserHistory} routes={routes} />
  //           </Provider>
  //       ), document.getElementById('root')
  //   );
  // };



//   return (
// <IntlProvider key="intl" {...intlData}>
// <Router history={history} routes={routeConfig} />
// </IntlProvider>
// )
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
