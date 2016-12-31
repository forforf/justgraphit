
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
    const allGraphs = storage.getAll();

    this.state = {
      storage: storage,
      currentGraphObj: currentGraphObj,
      allGraphs: allGraphs
    };

    // this.updateGraphNow = this.updateGraphNow.bind(this);
  }
  
  // updateGraphNow(graphName, newValue) {
  //   console.log("App: updateGraph:", graphName, newValue);
  //   let graph = this.state.storage.load(graphName) || [];
  //   console.log("App: graph loaded:", graphName, graph);
  //   graph.push({number: parseFloat(newValue), datetime: new Date().toISOString()});
  //   this.state.storage.save(graphName, graph);
  //   const currentGraphObj = this.state.storage.load(graphName);
  //   console.log("App: graph returned:", graphName, currentGraphObj);
  //   this.setState({currentGraphObj: currentGraphObj});
  // }


  // graphItFactory(props, currentGraph) {
  //   const GraphItWrapper = (props) => {
  //    return <Graphit storage={this.state.storage} currentGraphObj={this.state.currentGraphObj} updateGraphNow={this.updateGraphNow} allGraphs={this.state.allGraphs}/>;
  //   };
  //   return GraphItWrapper
  // }

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



//   export const routes = {
//   homepage: {
//     path: '/',
//     label: 'About React Lego',
//     title: `${siteTitle} - About React Lego`,
//     component: Homepage
//   },
//   game: {
//     path: '/game/',
//     label: 'Star Wars Trivia',
//     title: `${siteTitle} - Star Wars Trivia`,
//     component: Game
//   }
// };
//
//   const indexRoute = (route) => Object.assign({}, route, { path: null });
//
//   export const LinkHelper = ({ to, ...props }) => {
//   if (!routes[to]) throw new Error(`Route to '${to}' not found`);
//   return (
//       <Link to={ routes[to].path } { ...props }>
//         { props.children || routes[to].label }
//       </Link>
//   );
// };
//
//   export function makeRoutes() {
//   return (
//       <Route path="/" component={ MainLayout }>
//         <IndexRoute { ...indexRoute(routes.homepage) } />
//         <Route { ...routes.game } />
//         <Route path="*" title ={`${siteTitle} - Page Not Found`} component={ NotFound} />
//       </Route>
//   );
// }


//   return (
// <IntlProvider key="intl" {...intlData}>
// <Router history={history} routes={routeConfig} />
// </IntlProvider>
// )



  render() {
    const GraphItWrapper = (props) => {
      return <Graphit storage={this.state.storage} currentGraphObj={this.state.currentGraphObj} updateGraphNow={this.updateGraphNow} allGraphs={this.state.allGraphs}/>;
    };

    return (
      <MuiThemeProvider>
        <Router history={hashHistory}>
          <Route path="/" component={Container}>
            <IndexRoute component={GraphItWrapper}/>
            <Route path="/about" component={About}/>
          </Route>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
