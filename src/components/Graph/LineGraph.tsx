import React from 'react';
import * as d3 from 'd3';
import relative from '../../datetime/relative';
import GraphAxis from './GraphAxis';
import { D3Select, DateOrIso, JustGraphitEntry } from '../../JustGraphitTypes';

// Look ma, we got rid of all the state!

type Margin = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

type Size = {
  h: number;
  w: number;
};

// Generates ticks for the time axis (i.e, x axis)
function tickTimeSelector(baseTimeTicks: (DateOrIso | undefined)[]) {
  let tickTimeSelector = [new Date()];
  const first = baseTimeTicks[0];
  const last = baseTimeTicks[baseTimeTicks.length - 1];
  if (first instanceof Date && last instanceof Date) {
    const midpoint = new Date((first.getTime() + last.getTime()) / 2);
    tickTimeSelector = [first, last, midpoint];
  }
  return tickTimeSelector;
}

// This extracts all the d3 dependencies and allows us to inject a d3 alternative (e.g., a mock)
function d3Fns(d3g = d3) {
  return {
    axisMaker: (
      data: JustGraphitEntry[],
      x: d3.ScaleTime<number, number>,
      y: d3.AxisScale<number>
    ) => {
      const bottomTickValues = tickTimeSelector(data.map((o) => o.dt));

      const xAxis = d3g
        .axisBottom<Date>(x)
        .tickValues(bottomTickValues)
        .tickFormat(relative);

      const yAxis = d3g.axisLeft(y).ticks(5);

      return {
        x: xAxis,
        y: yAxis,
      };
    },
    grapher: (data: JustGraphitEntry[], size: Size, margin: Margin) => {
      const num = function (d: JustGraphitEntry) {
        return d.number;
      };

      const minNum = d3g.min(data, num) ?? 0;
      const maxNum = d3g.max(data, num) ?? 0;

      const startDt = data[0].dt ?? new Date(0);
      const endDt = data[data.length - 1].dt ?? new Date(0);

      // The scaleLinear domain and range methods were giving the weak warning
      //     Argument types do not match parameters
      // Which might be an IDE bug as it doesn't show up in CLI
      const y = d3g
        .scaleLinear<number, number>()
        .domain([minNum, maxNum])
        .range([size.h, 0]); // reversed since svg 0,0 is top, left

      const x = d3g.scaleTime().domain([startDt, endDt]).range([0, size.w]);

      const xVal = (d: JustGraphitEntry): number => x(d.dt ?? new Date(0));
      const yVal = (d: JustGraphitEntry): number => y(d.number);

      const mLeft = margin.left ?? 0;
      const mTop = margin.top ?? 0;
      const transform = `translate(${mLeft},${mTop})`;

      const line = d3g.line<JustGraphitEntry>().x(xVal).y(yVal);

      return {
        x: x,
        y: y,
        line: line(data),
        transform: transform,
      };
    },
    select: d3g.select,
  };
}

function graphSize(height: number, width: number, margin: Margin) {
  const top = margin.top ?? 0;
  const bottom = margin.bottom ?? 0;
  const left = margin.top ?? 0;
  const right = margin.right ?? 0;
  const h = height - (top + bottom);
  const w = width - (left + right);
  return { height: h, width: w };
}

// I feel like there's a better way that's cleaner and maintains immutability, but I haven't found it yet
function parseMergeDatetime(obj: JustGraphitEntry) {
  obj['dt'] = new Date(obj.datetime);
  return obj;
}

export type LineGraphProps = {
  height: number;
  width: number;
  chartId: string;
  graphData: JustGraphitEntry[];
};

function LineGraph({
  height,
  width,
  chartId,
  graphData,
}: LineGraphProps): JSX.Element | null {
  const margin = { top: 20, right: 50, bottom: 20, left: 50 };
  const h = graphSize(height, width, margin).height;
  const w = graphSize(height, width, margin).width;

  const data = graphData.map(parseMergeDatetime);

  if (data.length === 0) {
    return null;
  }
  if (data.length === 1) {
    return null;
  }

  const myD3 = d3Fns();
  const d3Graph = myD3.grapher(data, { h: h, w: w }, margin);
  const d3Axis = myD3.axisMaker(data, d3Graph.x, d3Graph.y);

  // passing d3.select as a prop makes it so easy to test/mock the child components
  const d3select = myD3.select;
  const d3GraphLine = d3Graph.line ?? '';

  // ToDo: Add support for tooltips when I figure out how to make it compatible with mobile devices
  return (
    <svg id={chartId} width={width} height={height} className="line-graph">
      <GraphAxis<d3.Axis<number>>
        bottom={margin.bottom}
        left={margin.left}
        axis={d3Axis.y}
        d3select={d3select as unknown as D3Select} //TODO: Is there a better type cast?
      />
      <GraphAxis<d3.Axis<Date>>
        bottom={height - margin.bottom}
        left={margin.left}
        axis={d3Axis.x}
        d3select={d3select as unknown as D3Select} //TODO: Is there a better type cast?
      />
      <g transform={d3Graph.transform}>
        <path d={d3GraphLine} fill="none" stroke="#000" strokeLinecap="round" />
      </g>
    </svg>
  );
}

LineGraph.defaultProps = {
  chartId: 'line-graph',
  height: 200,
  width: 360,
};

export default LineGraph;
