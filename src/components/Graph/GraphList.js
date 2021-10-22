import React from 'react';
import GraphListItem from "./GraphListItem";


function GraphList({graphNameList, changeSelectedGraph, deleteGraph}) {

  const graphList = graphNameList.map((graphName, index) => (
    <GraphListItem
      key={`graphList-${index}`}
      handleClick={changeSelectedGraph}
      graphName={graphName}
      // deleteGraph={storageFns.deleteGraph}
      deleteGraph={deleteGraph}
    />
  ));

  return (
    <div className="GraphList">
      <h3>Graph List</h3>
      {graphList}
    </div>
  );
}

export default GraphList;
