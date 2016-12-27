
import React, { Component } from 'react';
import './Graphit.css';
import GraphInput from 'GraphView/GraphInput.js'
import GraphChart from 'GraphView/GraphViewer.js'


class Graphit extends Component {
  render() {
    return (
      <div className="App">
        <GraphInput />
        <GraphChart />
      </div>
    );
  }
}

export default Graphit;
