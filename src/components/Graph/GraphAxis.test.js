import renderer from 'react-test-renderer';
import GraphAxis from './GraphAxis';

let mockD3select = null;
beforeEach(() => {
  mockD3select = () => jest.fn(() => 'd3.select(...).call(axis) result')
})

test('deep snapshot x-axis', () => {
  const component = renderer.create(
    <GraphAxis axisType={'x'} bottom={0} left={0} d3select={mockD3select}/>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('deep snapshot y-axis', () => {
  const component = renderer.create(
    <GraphAxis axisType={'y'} bottom={0} left={0}/>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
