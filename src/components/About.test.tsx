import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import About from './About';

jest.mock('./About/about-fetcher', () => ({
  getProjectData: jest.fn(() => ({
    NAME: 'Mock Name',
    VERSION: '0.0.0',
    AUTHOR_EMAIL: 'mock@example.com',
    LICENSE: 'Mock License',
  })),
}));

afterEach(() => {
  jest.clearAllMocks();
});

test('deep snapshot', () => {
  const component = renderer.create(<About />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('shallow snapshot', () => {
  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<About />);
  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
