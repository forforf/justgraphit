import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow'
import GraphElement, {GraphElementProps} from './GraphElement';
import {ISODatetimeType, JustGraphitEntry} from "../../JustGraphitTypes";


const height = 10;
const width = 20;
let graphData: JustGraphitEntry[];
let graphElementProps: GraphElementProps;


describe('empty graph', () => {
  beforeEach(() => {
    graphData = [];
    graphElementProps = {graphData, height, width};
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
    graphData = [{number: 1, datetime: (new Date('2000-01-01T00:00:00')).toISOString() as ISODatetimeType}];
    graphElementProps = {graphData, height, width};
  });

  test('deep snapshot', () => {
    const component = renderer.create(
      <GraphElement {...graphElementProps}/>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });


  test('shallow snapshot', () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render( <GraphElement {...graphElementProps}/>);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot()
  });
})

describe('line graph', () => {
  beforeEach(() => {
    graphData = [
      {number: 1, datetime: (new Date('1999-12-31T23:59:59')).toISOString() as ISODatetimeType},
      {number: 2, datetime: (new Date('2000-01-02T00:00:00')).toISOString() as ISODatetimeType},
    ];
    graphElementProps = {graphData, height, width};
  });

  test('deep snapshot', () => {
    const component = renderer.create(
      <GraphElement {...graphElementProps}/>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });


  test('shallow snapshot', () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render( <GraphElement {...graphElementProps}/>);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot()
  });
})


