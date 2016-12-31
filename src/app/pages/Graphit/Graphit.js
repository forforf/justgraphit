
import React, { Component } from 'react';
import './Graphit.css';
import GraphInput from 'GraphView/GraphInput.js'
import GraphChart from 'GraphView/GraphChart.js'
import GraphList  from 'GraphView/GraphList.js'


class Graphit extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    console.log('Graphit', props);
    const currentGraphObj = props.storage.getLastKeyValue();
    const allGraphs = props.storage.getAll();
    this.state = {
      allGraphs: allGraphs,
      currentGraphObj: currentGraphObj,
    }

    this.updateGraphNow = this.updateGraphNow.bind(this);
  }

  updateGraphNow(graphName, newValue) {
    console.log("App: updateGraph:", graphName, newValue);
    let graph = this.props.storage.load(graphName) || [];
    console.log("App: graph loaded:", graphName, graph);
    graph.push({number: parseFloat(newValue), datetime: new Date().toISOString()});
    this.props.storage.save(graphName, graph);
    const currentGraphObj = this.props.storage.load(graphName);
    console.log("App: graph returned:", graphName, currentGraphObj);
    this.setState({currentGraphObj: currentGraphObj});
  }


  render() {
    return (
      <div className="App">
        <GraphInput currentGraphObj={this.state.currentGraphObj} updateGraphNow={this.updateGraphNow}/>
        <GraphChart currentGraphObj={this.state.currentGraphObj} />
        <GraphList  allGraphs={this.state.allGraphs} />
      </div>
    );
  }
}

export default Graphit;
