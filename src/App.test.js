import renderer from 'react-test-renderer';
import App from './App';

test('snapshot', () => {
  const component = renderer.create(
    <App />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
