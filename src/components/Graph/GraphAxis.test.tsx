import React from 'react';
import renderer from 'react-test-renderer';
import GraphAxis from './GraphAxis';

let mockD3select: () => jest.Mock<unknown, unknown[]>;

beforeEach(() => {
  mockD3select = () => jest.fn(() => 'd3.select(...).call(axis) result');
});

test('deep snapshot x-axis', () => {
  const props = {
    axis: jest.fn() as unknown as d3.Axis<number>,
    bottom: 0,
    left: 0,
    d3select: mockD3select,
  };

  const component = renderer.create(<GraphAxis<d3.Axis<number>> {...props} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('deep snapshot y-axis', () => {
  const props = {
    axis: jest.fn() as unknown as d3.Axis<number>,
    bottom: 0,
    left: 0,
    d3select: mockD3select,
  };
  const component = renderer.create(<GraphAxis {...props} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
