import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import LineGraph, { LineGraphProps } from './LineGraph';
import { ISODatetimeType, JustGraphitEntry } from '../../JustGraphitTypes';

let height = null;
let width = null;
let chartId = null;
let graphData: JustGraphitEntry[];
let lineGraphProps: LineGraphProps;
beforeEach(() => {
  height = 10;
  width = 20;
  chartId = 'some-chart-id';
  graphData = [
    {
      number: 1,
      datetime: new Date(
        '1999-12-31T23:59:59'
      ).toISOString() as ISODatetimeType,
    },
    {
      number: 2,
      datetime: new Date(
        '2000-01-02T00:00:00'
      ).toISOString() as ISODatetimeType,
    },
  ];
  lineGraphProps = { height, width, chartId, graphData };
});

test('deep snapshot', () => {
  const component = renderer.create(<LineGraph {...lineGraphProps} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('shallow snapshot', () => {
  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<LineGraph {...lineGraphProps} />);
  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
