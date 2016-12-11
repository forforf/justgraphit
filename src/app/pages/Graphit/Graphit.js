
import React, { Component } from 'react';
import './Graphit.css';
import GraphInput from 'components/GraphInput/GraphInput'
import GraphChart from 'components/GraphChooser/GraphChooser'


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
