
import React from 'react';
import NavBar from './NavBar';

const Container = (props) =>
  <div>
    <NavBar />
    {props.children}
  </div>;

export default Container;
