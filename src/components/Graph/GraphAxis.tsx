import React, { useEffect, useRef } from 'react';
import { D3Select } from '../../JustGraphitTypes';

type AxisType = d3.Axis<Date> | d3.Axis<number>;

type Props<T extends AxisType> = {
  axis: T;
  bottom: number;
  left: number;
  d3select: D3Select;
};

function GraphAxis<T extends AxisType>({
  axis,
  bottom,
  left,
  d3select,
}: Props<T>): JSX.Element {
  const axisRef = useRef(null);

  // triggered on render or changes to axis props.
  useEffect(() => {
    if (axisRef !== null && axisRef.current) {
      d3select(axisRef.current).call(axis);
    }
  }, [axis, d3select]);

  const translate = `translate(${left},${bottom})`;

  return <g className="axis" ref={axisRef} transform={translate} />;
}

export default GraphAxis;
