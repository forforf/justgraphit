
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
    this.state = {
      currentGraphObj: currentGraphObj
    };

    this.updateGraphNow = this.updateGraphNow.bind(this);
  }

  updateGraphNow(graphName, newValue) {
    console.log("Graphit: updateGraph:", graphName, newValue);
    let graph = this.props.storage.load(graphName) || [];
    graph.push({number: parseFloat(newValue), datetime: new Date().toISOString()});
    this.props.storage.save(graphName, graph);
    this.displayGraph(graphName);
  }

  // We need "this" to bind to this class, not the caller.
  displayGraph = (graphName) => {
    console.log("Graphit: displayGraph:", graphName);
    let graphData = this.props.storage.load(graphName) || [];
    const currentGraphObj = { key: graphName, value: graphData };
    this.props.storage.updateHistory(graphName);
    this.setState({currentGraphObj: currentGraphObj});
  };

  render() {
    return (
      <div className="App">
        <GraphInput currentGraphObj={this.state.currentGraphObj} updateGraphNow={this.updateGraphNow}/>
        <GraphChart currentGraphObj={this.state.currentGraphObj} />
        <GraphList displayGraph={this.displayGraph} storage={this.props.storage}/>
      </div>
    );
  }
}

export default Graphit;
