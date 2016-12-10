
import React from 'react';
import HeaderNav from './HeaderNav';

const Container = (props) =>
  <div>
    <HeaderNav />
    {props.children}
  </div>;

export default Container;
