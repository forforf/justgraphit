
import React from 'react';
import Nav from './Nav';

const Container = (props) => <div>
  <h1> Container </h1>
  <Nav />
  {props.children}

</div>;

export default Container;
