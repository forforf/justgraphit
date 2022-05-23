import React, { useEffect, useRef, useState } from 'react';
import GraphElement from './GraphElement';
import GraphObject from '../../StorageModel/GraphObject';

const GRAPH_DEFAULTS: { height: number; width: number } = {
  height: 200,
  width: 300,
};

export type GraphChartProps = {
  graphObject: GraphObject;
};

function enforceMinimum(curVal: number, minVal: number): number {
  return curVal < minVal ? minVal : curVal
}

function GraphChart({ graphObject }: GraphChartProps): JSX.Element {
  const [height, setHeight] = useState<number>(GRAPH_DEFAULTS.height);
  const [width, setWidth] = useState<number>(GRAPH_DEFAULTS.width);
  const graphRef = useRef<HTMLDivElement>(null);

  // Only triggered on render.
  // there might be a way to trigger graph resize when browser is resized
  // but would that be a feature or a bug?
  // Maybe we *want* the graph to stay the same size when resizing browser window. but if so need to tell user about it
  useEffect(() => {
    const current = graphRef?.current;
    const h = current?.clientHeight;
    const w = current?.clientWidth;

    if (h != null && w != null) {
      // There's probably a better way to ensure that a brand-new graph is the correct size
      const hEnforced = enforceMinimum(h, GRAPH_DEFAULTS.height)
      const wEnforced = enforceMinimum(w, GRAPH_DEFAULTS.height)
      /* `!= null` checks for null and undefined */
      setHeight(hEnforced);
      setWidth(wEnforced);
    }
  }, [graphRef]);

  return (
    <div className="GraphChart" ref={graphRef}>
      <GraphElement
        graphData={graphObject.data}
        height={height}
        width={width}
      />
    </div>
  );
}

export default GraphChart;
