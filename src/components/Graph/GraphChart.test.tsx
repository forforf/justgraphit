import React from 'react';
import renderer from 'react-test-renderer';
import ReactDom from 'react-dom'
import {act} from 'react-dom/test-utils'
import GraphChart, {GraphChartProps} from './GraphChart';
import GraphObject from "../../StorageModel/GraphObject";

// let mockD3select: () => jest.Mock<unknown, any>;
//
// beforeEach(() => {
//   mockD3select = () => jest.fn(() => 'd3.select(...).call(axis) result')
// })


let graphChartProps: GraphChartProps;
beforeEach(() => {
  graphChartProps = {
    // graphObject: jest.fn(() => ({name: 'foo', data: []}))
    graphObject: {name: 'foo', data: []} as GraphObject
  }
})

test('deep snapshot', () => {
  const component = renderer.create(
    <GraphChart {...graphChartProps}/>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('useEffect', () => {
  const mount = document.createElement('div');
  act(() => {
    ReactDom.render(
      <GraphChart {...graphChartProps}/>,
      mount
    )
  })
  expect(mount).toMatchSnapshot()
});

