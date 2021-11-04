import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import Faq from './Faq';

test('deep snapshot', () => {
  const component = renderer.create(<Faq />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('shallow snapshot', () => {
  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<Faq />);
  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
