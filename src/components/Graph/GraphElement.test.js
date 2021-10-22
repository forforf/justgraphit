import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow'
import GraphElement from './GraphElement';


const graphName = 'graph name';
const height = 10;
const width = 20;
let graphData = null;
let graphElementProps = null;

describe('empty graph', () => {
  beforeEach(() => {
    graphData = [];
    graphElementProps = {graphName, graphData, height, width};
  });

  test('deep snapshot', () => {
    const component = renderer.create(
      <GraphElement {...graphElementProps}/>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
})

describe('single item graph', () => {
  beforeEach(() => {
    graphData = [{number: 1, datetime: (new Date('2000-01-01T00:00:00')).toISOString()}];
    graphElementProps = {graphName, graphData, height, width};
  });

  test('deep snapshot', () => {
    const component = renderer.create(
      <GraphElement {...graphElementProps}/>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });


  test('shallow snapshot', () => {
    const renderer = new ShallowRenderer();
    renderer.render( <GraphElement {...graphElementProps}/>);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot()
  });
})

describe('line graph', () => {
  beforeEach(() => {
    graphData = [
      {number: 1, datetime: (new Date('1999-12-31T23:59:59')).toISOString()},
      {number: 2, datetime: (new Date('2000-01-02T00:00:00')).toISOString()},
    ];
    graphElementProps = {graphName, graphData, height, width};
  });

  test('deep snapshot', () => {
    const component = renderer.create(
      <GraphElement {...graphElementProps}/>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });


  test('shallow snapshot', () => {
    const renderer = new ShallowRenderer();
    renderer.render( <GraphElement {...graphElementProps}/>);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot()
  });
})


