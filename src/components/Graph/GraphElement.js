import React from 'react';
import IsEmpty from 'lodash.isempty';
import EmptyGraph from './EmptyGraph.js'
import SingleItemGraph from './SingleItemGraph.js'
import LineGraph from './LineGraph.js'


function GraphElement({graphName, graphData, height, width}) {
  // Early returns for legibility
  if (IsEmpty(graphData)) return <EmptyGraph />
  // we know graphData is not empty
  if (graphData.length === 1) return <SingleItemGraph
    graphName={graphName}
    itemNumber={graphData[0].number}
    itemDatetime={graphData[0].datetime}
  />
  return <LineGraph
    chartId="jgi-line-graph"
    graphName={graphName}
    graphData={graphData}
    height={height}
    width={width}
  />
}

export default GraphElement
