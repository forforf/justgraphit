import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import GraphInput, { GraphInputProps } from './GraphInput';

let graphInputProps: GraphInputProps;
beforeEach(() => {
  graphInputProps = {
    graphName: 'graph name',
    addNewNumber: jest.fn(),
  };
});

test('deep snapshot', () => {
  const component = renderer.create(<GraphInput {...graphInputProps} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('shallow snapshot', () => {
  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<GraphInput {...graphInputProps} />);
  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
