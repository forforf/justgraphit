import React from 'react';
import relative from '../../datetime/relative';
import { ISODatetimeType } from '../../JustGraphitTypes';

const style = {
  marginLeft: '5em',
  marginTop: '2em',
  paddingTop: '2em',
  paddingBottom: '2em',
  borderStyle: 'solid',
};

type SingleItemGraphProps = {
  itemNumber: number;
  itemDatetime: ISODatetimeType;
};

const SingleItemGraph = ({
  itemNumber,
  itemDatetime,
}: SingleItemGraphProps): JSX.Element => {
  const itemDate = new Date(itemDatetime);
  return (
    <div style={style}>
      <div>Not enough to graph yet. Only a single lonely value of:</div>
      <h3>{itemNumber}</h3>
      {relative(itemDate)}
    </div>
  );
};

export default SingleItemGraph;
