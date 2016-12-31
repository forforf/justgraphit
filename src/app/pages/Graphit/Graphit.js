
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
    this.state = {
      allGraphs: this.props.allGraphs,
      currentGraphObj: this.props.currentGraphObj
    }
  }
  
  render() {
    return (
      <div className="App">
        <GraphInput currentGraphObj={this.state.currentGraphObj} updateGraphNow={this.props.updateGraphNow}/>
        <GraphChart currentGraphObj={this.state.currentGraphObj} />
        <GraphList  allGraphs={this.state.allGraphs} />
      </div>
    );
  }
}

export default Graphit;
