import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow'
import {HashRouter} from 'react-router-dom';
import NavBar from './NavBar';


test('deep snapshot', () => {
  const component = renderer.create(
    <HashRouter>
      <NavBar />,
    </HashRouter>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('shallow snapshot', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<NavBar />);
  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot()
});


