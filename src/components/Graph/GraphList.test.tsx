import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import GraphList, {GraphListProps} from './GraphList';


describe('single empty graph', () => {
  let graphListProps: GraphListProps;
  beforeEach(() => {
    graphListProps = {
      graphNameList: ['graph 1'],
      changeSelectedGraph: jest.fn(),
      deleteGraph: jest.fn()
    }
  });

  test('deep snapshot', () => {
    const component = renderer.create(
      <GraphList {...graphListProps}/>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('shallow snapshot', () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render( <GraphList {...graphListProps}/>);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot()
  });
})