
import React from 'react';
import {IndexLink, Link} from 'react-router';
import {Tabs, Tab} from 'material-ui/Tabs';

const NavBar = () => (
    <Tabs>
      <Tab label='GraphIt' containerElement={<IndexLink to='/'>Home</IndexLink>} />
      <Tab label='About' containerElement={<Link to='/about'>About</Link>} />
    </Tabs>
);

export default NavBar;
