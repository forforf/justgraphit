import React, {useEffect, useRef} from 'react';


function GraphAxis({axis, bottom, left, d3select}) {
  const axisRef = useRef(null);

  // triggered on render or changes to axis props.
  useEffect(() => {
    d3select(axisRef.current).call(axis)
  }, [axis, d3select]);

  const translate = `translate(${left},${bottom})`;

  return (
    <g className="axis" ref={axisRef} transform={translate} >
    </g>
  );
}

//ToDo: propTypes
// GraphAxis.propTypes = {
//   height:React.PropTypes.number,
//   axis:React.PropTypes.func,
//   axisType:React.PropTypes.oneOf(['x','y'])
// };

export default GraphAxis;
