import renderer from 'react-test-renderer';
import SingleItemGraph from './SingleItemGraph';


test('deep snapshot', () => {
  const component = renderer.create(
    <SingleItemGraph itemNumber={42} itemDatetime={'2000-01-01T00:00:00.000Z'} />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});