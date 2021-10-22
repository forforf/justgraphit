import React, {useEffect, useRef, useState} from 'react';
import GraphElement from "./GraphElement";


const GRAPH_DEFAULTS = {
  height: 200,
  width: 300
};

function GraphChart({graphObject}) {
  const [height, setHeight] = useState(GRAPH_DEFAULTS.height);
  const [width, setWidth] = useState(GRAPH_DEFAULTS.width)
  const graphRef = useRef(null);

  // Only triggered on render.
  // there might be a way to trigger graph resize when browser is resized
  // but would that be a feature or a bug?
  // Maybe we *want* the graph to stay the same size when resizing browser window. but if so need to tell user about it
  useEffect(() => {
    const current = graphRef && graphRef.current;
    const h = current && current.clientHeight;
    const w = current && current.clientWidth
    setHeight(h);
    setWidth(w)
  }, []);


  return (
    <div className="GraphChart" ref={graphRef}>
      <GraphElement graphName={graphObject.name} graphData={graphObject.data} height={height} width={width} />
    </div>
  )
}

export default GraphChart
