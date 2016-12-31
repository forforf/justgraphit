
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
    // render toggle is (hopefully) a temporay hack to flag that
    // the state has indeed changed and a rerender is necessary.
    this.state = {
      allGraphs: allGraphs,
      currentGraphObj: currentGraphObj,
      renderToggle: true
    };

    this.updateGraphNow = this.updateGraphNow.bind(this);
  }

  setCurrentGraph() {
    this.setState({currentGraphObj: this.props.storage.getLastKeyValue()})
    console.log('Graphit State Set to', this.state );
  }

  updateGraphNow(graphName, newValue) {
    console.log("Graphit: updateGraph:", graphName, newValue);
    let graph = this.props.storage.load(graphName) || [];
    console.log("Graphit: graph loaded:", graphName, graph);
    graph.push({number: parseFloat(newValue), datetime: new Date().toISOString()});
    this.props.storage.save(graphName, graph);
    const currentGraphData = this.props.storage.load(graphName);
    console.log("Graphit: graph returned:", graphName, currentGraphData);
    const currentGraphObj = { key: graphName, value: currentGraphData };
    this.setState({currentGraphObj: currentGraphObj});
    this.setState({renderToggle: !this.state.renderToggle});
  }

  // We need "this" to bind to this class, not the caller.
  displayGraph = (graphName) => {
    console.log("Graphit: displayGraph:", graphName);
    console.log("props", this.props);
    let graphData = this.props.storage.load(graphName) || [];
    console.log("Graphit: graph loaded:", graphName, graphData);
    const currentGraphObj = { key: graphName, value: graphData };
    this.setState({currentGraphObj: currentGraphObj});
    this.setState({renderToggle: !this.state.renderToggle});
  };

  componentDidMount() {
    this.setCurrentGraph();
  }

  componentWillUnmount() {
    // anything to do?
  }


  render() {
    return (
      <div className="App">
        <GraphInput currentGraphObj={this.state.currentGraphObj} updateGraphNow={this.updateGraphNow}/>
        <GraphChart currentGraphObj={this.state.currentGraphObj} renderToggle={this.state.renderToggle} />
        <GraphList  allGraphs={this.state.allGraphs} displayGraph={this.displayGraph} storage={this.props.storage}/>
      </div>
    );
  }
}

export default Graphit;
