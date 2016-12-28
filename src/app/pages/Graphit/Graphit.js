
import React, { Component } from 'react';
import './Graphit.css';
import GraphInput from 'GraphView/GraphInput.js'
import GraphChart from 'GraphView/GraphChart.js'


class Graphit extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.currentGraphObj = props.currentGraphObj;
  }
  
  render() {
    return (
      <div className="App">
        <GraphInput currentGraphObj={this.state.currentGraphObj} persistGraphObj={this.props.persistGraphObj}/>
        <GraphChart currentGraphObj={this.state.currentGraphObj} />
      </div>
    );
  }
}

export default Graphit;
