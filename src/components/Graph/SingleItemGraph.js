import React from 'react';
import relative from '../../datetime/relative'

const style = {
  marginLeft: '5em',
  marginTop: '2em',
  paddingTop: '2em',
  paddingBottom: '2em',
  borderStyle: 'solid'
};

const SingleItemGraph = ({itemNumber, itemDatetime}) =>
    <div style={style}>
      <div>Not enough to graph yet. Only a single lonely value of:</div>
      <h3>{itemNumber}</h3>
      {relative(itemDatetime)}
    </div>;

export default SingleItemGraph;
