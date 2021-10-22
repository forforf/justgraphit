import React from 'react';
import * as d3 from 'd3';
import relative from '../../datetime/relative'
import GraphAxis from './GraphAxis.js';


// Look ma, no state!

// Generates ticks for the time axis (i.e, x axis)
function tickTimeSelector(baseTimeTicks) {
  const first = baseTimeTicks[0];
  const last  = baseTimeTicks[baseTimeTicks.length - 1];
  const midpoint = new Date((first.getTime() + last.getTime()) / 2);
  return [first, last, midpoint ]
}

// This extracts all the d3 dependencies and allows us to inject a d3 alternative (e.g., a mock)
function d3Fns(d3g=d3) {
  return {
    axisMaker: (data, x, y) => {
      const bottomTickValues = tickTimeSelector(data.map(o => o.dt));

      const xAxis = d3g.axisBottom(x)
        .tickValues(bottomTickValues)
        .tickFormat(relative);

      const yAxis = d3g.axisLeft(y).ticks(5);

      return {
        x: xAxis,
        y: yAxis
      }
    },
    grapher: (data, size, margin) => {
      const num = function(d){ return d.number};

      const minNum = d3g.min(data, num);
      const maxNum = d3g.max(data, num);

      const startDt = data[0].dt;
      const endDt = data[data.length-1].dt;

      const y = d3g.scaleLinear()
        .domain( [ minNum, maxNum ] )
        .range([size.h,0]); // reversed since svg 0,0 is top, left

      const x = d3g.scaleTime()
        .domain( [ startDt, endDt ] )
        .range([0, size.w]);

      const xVal = d => x(d.dt);
      const yVal = d => y(d.number)

      const transform = `translate(${margin.left},${margin.top})`

      const line = d3g.line()
        .x(xVal)
        .y(yVal);

      return {
        x: x,
        y: y,
        line: line(data),
        transform: transform
      }
    },
    select: d3g.select
  }
}

function graphSize (height, width, margin) {
  const h = height - (margin.top + margin.bottom);
  const w = width - (margin.left + margin.right);
  return { height: h, width: w}
}

// I feel like there's a better way that's cleaner and maintains immutability, but I haven't found it yet
function parseMergeDatetime(obj) {
  obj['dt'] = new Date(obj.datetime);
  return obj;
}

function LineGraph({height, width, chartId, graphData}) {
  const margin = {top: 20, right: 50, bottom: 20, left: 50};
  const h = graphSize(height, width, margin).height;
  const w = graphSize(height, width, margin).width;

  const data =  graphData.map( parseMergeDatetime );

  if(data.length === 0) { return null }
  if(data.length === 1) { return null }

  const myD3 = d3Fns();
  const d3Graph = myD3.grapher(data, {h:h, w:w}, margin);
  const d3Axis = myD3.axisMaker(data, d3Graph.x, d3Graph.y);

  // passing d3.select as a prop makes it so easy to test/mock the child components
  const d3select = myD3.select;

  // ToDo: Add support for tooltips when I figure out how to make it compatible with mobile devices
  return (
    <svg id={chartId} width={width} height={height} className="line-graph">
      <GraphAxis
        bottom={margin.bottom}
        left={margin.left}
        axis={d3Axis.y}
        d3select={d3select}
      />
      <GraphAxis
        bottom={height - margin.bottom}
        left={margin.left}
        axis={d3Axis.x}
        d3select={d3select}
      />
      <g transform={d3Graph.transform}>
        <path d={d3Graph.line} fill="none" stroke="#000" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

// LineGraph.propTypes = {
//   chartId: React.PropTypes.string,
//   height:  React.PropTypes.number,
//   width:   React.PropTypes.number
// };

LineGraph.defaultProps = {
  chartId: 'line-graph',
  height: 200,
  width: 360
};

export default LineGraph;
