import React from 'react';
import './Graphit/Graphit.css';
import GraphInput from './Graph/GraphInput'
import GraphChart from './Graph/GraphChart'
import GraphList from './Graph/GraphList'


function Graphit({graphObject, addNewNumber, changeSelectedGraph, deleteGraph, graphNameList}) {

  // props
  const graphChartProps = { graphObject }
  const graphInputProps = {
    graphName: graphObject.name,
    addNewNumber
  }
  const graphListProps = {
    graphNameList,
    changeSelectedGraph,
    deleteGraph
  }

  return (
    <div className="Graphit">
      <div className="wrapper">
        <div className="row">
          <div className="left col-2-3">
            <GraphInput {...graphInputProps}/>
            <GraphChart {...graphChartProps}/>
          </div>
          <div className="right col-1-3">
            <GraphList {...graphListProps}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Graphit;
