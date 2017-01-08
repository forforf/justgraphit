
import React, { Component } from 'react';
import './Graphit.css';
import GraphInput from 'GraphView/GraphInput.js'
import GraphChart from 'GraphView/GraphChart.js'
import GraphList  from 'GraphView/GraphList.js'


class Graphit extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    const currentGraphObj = props.storage.getLastStorageObject();
    this.state = {
      currentGraphObj: currentGraphObj
    };
    
    this.getLabeledObject = props.storage.getLabeledObject;

    this.updateGraphNow = this.updateGraphNow.bind(this);
  }

  updateGraphNow(graphName, newValue) {
    let graph = this.props.storage.load(graphName) || [];
    graph.push({number: parseFloat(newValue), datetime: new Date().toISOString()});
    this.props.storage.save(graphName, graph);
    this.displayGraph(graphName);
  }

  // We need "this" to bind to this class, not the caller.
  displayGraph = (graphName) => {
    let graphData = this.props.storage.load(graphName) || [];
    // [graphName]: value is equivalent to obj[graphName] = value
    const currentGraphObj = {[graphName]: graphData };
    this.props.storage.updateHistory(graphName);
    this.setState({currentGraphObj: currentGraphObj});
  };

  render() {
    return (
      <div className="Graphit">
        <div className="left">
          <GraphInput currentGraphObj={this.state.currentGraphObj} getLabeledObject={this.getLabeledObject} updateGraphNow={this.updateGraphNow}/>
          <GraphChart currentGraphObj={this.state.currentGraphObj} getLabeledObject={this.getLabeledObject}/>
        </div>
        <div className="right">
          <GraphList displayGraph={this.displayGraph} storage={this.props.storage}/>
        </div>
      </div>
    );
  }
}

export default Graphit;
