import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import GraphListItem from './GraphListItem';


const graphName = 'graph name';
let deleteGraph = null;
let handleClick = null;
let graphListItemProps = null;

describe('happy path', () => {
  beforeEach(() => {
    deleteGraph = jest.fn();
    handleClick = jest.fn()
    graphListItemProps = {graphName, deleteGraph, handleClick}
  });

  test('deep snapshot', () => {
    const component = renderer.create(
      <GraphListItem {...graphListItemProps}/>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('shallow snapshot', () => {
    const renderer = new ShallowRenderer();
    renderer.render( <GraphListItem {...graphListItemProps}/>);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot()
  });
});