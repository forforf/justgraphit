
import {IndexLink, Link} from 'react-router';
import React from 'react';

const Nav = () => (
    <div>
      <IndexLink to='/'>Home</IndexLink>;
      <Link to='/about'>About</Link>
    </div>
);

export default Nav;
