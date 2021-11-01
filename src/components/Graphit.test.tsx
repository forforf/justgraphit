import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import Graphit, {GraphitProps} from './Graphit';
import GraphObject from "../StorageModel/GraphObject";

let graphitProps: GraphitProps;
beforeEach(() => {
  graphitProps = {
    graphObject: new GraphObject('empty graph', []),
    addNewNumber: jest.fn(),
    changeSelectedGraph: jest.fn(),
    deleteGraph: jest.fn(),
    graphNameList: []
  }
})

test('deep snapshot', () => {
  const component = renderer.create(
    <Graphit {...graphitProps}/>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('shallow snapshot', () => {
  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<Graphit {...graphitProps}/>);
  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot()
});
