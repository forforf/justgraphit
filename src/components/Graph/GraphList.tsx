import React from 'react';
import GraphListItem from './GraphListItem';
import { GraphHandler, GraphName } from '../../JustGraphitTypes';

export type GraphListProps = {
  graphNameList: GraphName[];
  changeSelectedGraph: GraphHandler;
  deleteGraph: GraphHandler;
};

function GraphList({
  graphNameList,
  changeSelectedGraph,
  deleteGraph,
}: GraphListProps): JSX.Element {
  const graphNames = graphNameList ?? [];
  const graphList = graphNames.map((graphName, index) => (
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
