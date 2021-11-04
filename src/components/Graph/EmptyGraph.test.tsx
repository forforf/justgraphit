import React from 'react';
import renderer from 'react-test-renderer';
import EmptyGraph from './EmptyGraph';

test('deep snapshot', () => {
  const component = renderer.create(<EmptyGraph />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
