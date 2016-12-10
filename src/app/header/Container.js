
import React from 'react';
import AppBar from 'material-ui/AppBar';
import NavBar from './NavBar';

const Container = (props) =>
  <div>
    <AppBar title="JustGraphIt" showMenuIconButton={false}/>
    <NavBar />
    {props.children}
  </div>;

export default Container;
