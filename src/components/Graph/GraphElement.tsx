import React from 'react';
import IsEmpty from 'lodash.isempty';
import EmptyGraph from './EmptyGraph';
import SingleItemGraph from './SingleItemGraph';
import LineGraph from './LineGraph';
import { JustGraphitEntry } from '../../JustGraphitTypes';

export type GraphElementProps = {
  graphData: JustGraphitEntry[];
  height: number;
  width: number;
};

function GraphElement({
  graphData,
  height,
  width,
}: GraphElementProps): JSX.Element {
  // Early returns for legibility
  if (IsEmpty(graphData)) return <EmptyGraph />;
  // we know graphData is not empty
  if (graphData.length === 1)
    return (
      <SingleItemGraph
        itemNumber={graphData[0].number}
        itemDatetime={graphData[0].datetime}
      />
    );
  return (
    <LineGraph
      chartId="jgi-line-graph"
      graphData={graphData}
      height={height}
      width={width}
    />
  );
}

export default GraphElement;
