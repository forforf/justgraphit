import React from 'react';
import renderer from 'react-test-renderer';
import { createRoot } from 'react-dom/client'
import { act } from 'react-dom/test-utils';
import GraphChart, { GraphChartProps } from './GraphChart';
import GraphObject from '../../StorageModel/GraphObject'; // let mockD3select: () => jest.Mock<unknown, any>;

// @ts-ignore
globalThis.IS_REACT_ACT_ENVIRONMENT = true

let graphChartProps: GraphChartProps;
beforeEach(() => {
  graphChartProps = {
    // graphObject: jest.fn(() => ({name: 'foo', data: []}))
    graphObject: { name: 'foo', data: [] } as GraphObject,
  };
});

test('deep snapshot', () => {
  const component = renderer.create(<GraphChart {...graphChartProps} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('useEffect', () => {
  const mount = document.createElement('div')
  const root = createRoot(mount!);
  act(() => {
    root.render(<GraphChart {...graphChartProps} />)
  });
  expect(mount).toMatchSnapshot();
});
