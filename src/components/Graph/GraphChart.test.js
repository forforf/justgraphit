import renderer from 'react-test-renderer';
import ReactDom from 'react-dom'
import {act} from 'react-dom/test-utils'
import GraphChart from './GraphChart';


let graphChartProps = null;
beforeEach(() => {
  graphChartProps = {
    graphObject: jest.fn(() => ({name: 'foo', data: []}))
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

