import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import Editor, { EditorProps } from './Editor';
import GraphObject from '../StorageModel/GraphObject';
import { ISODatetimeType, JustGraphitEntry } from '../JustGraphitTypes';

let editorProps: EditorProps;
beforeEach(() => {
  const graphData: JustGraphitEntry[] = [
    {
      number: 1,
      datetime: new Date(
        '1999-12-31T23:59:59.00Z'
      ).toISOString() as ISODatetimeType,
    },
    {
      number: 2,
      datetime: new Date(
        '2000-01-02T00:00:00.000Z'
      ).toISOString() as ISODatetimeType,
    },
  ];
  editorProps = {
    graphObject: new GraphObject('a graph', graphData),
    setGraphObject: jest.fn(),
    saveToStorage: jest.fn(),
  };
});

test('deep snapshot', () => {
  const component = renderer.create(<Editor {...editorProps} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('shallow snapshot', () => {
  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<Editor {...editorProps} />);
  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
