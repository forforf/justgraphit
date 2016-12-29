
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
    this.state.allGraphs = props.allGraphs;
    this.state.currentGraphObj = props.currentGraphObj;
  }
  
  render() {
    return (
      <div className="App">
        <GraphInput currentGraphObj={this.state.currentGraphObj} persistGraphObj={this.props.persistGraphObj}/>
        <GraphChart currentGraphObj={this.state.currentGraphObj} />
        <GraphList  allGraphs={this.state.allGraphs} />
      </div>
    );
  }
}

export default Graphit;
