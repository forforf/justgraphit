import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow'
import Editor from './Editor';
import GraphObject from '../StorageModel/GraphObject';


let editorProps = null;
beforeEach(() => {
  const graphData = [
    {number: 1, datetime: (new Date('1999-12-31T23:59:59')).toISOString()},
    {number: 2, datetime: (new Date('2000-01-02T00:00:00')).toISOString()},
  ];
  editorProps = {
    graphObject: new GraphObject('a graph', graphData),
    setGraphObject: jest.fn(),
    saveToStorage: jest.fn()
  }
})

test('deep snapshot', () => {
  const component = renderer.create(
    <Editor {...editorProps} />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('shallow snapshot', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Editor {...editorProps} />);
  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot()
});
