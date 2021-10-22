import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Tab, Tabs} from '@mui/material';


const NavBar = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange}>
      <Tab label='GraphIt' to='/' component={Link} />
      <Tab label='Editor'  to='/edit' component={Link} />
      <Tab label='About'   to='/about' component={Link} />
    </Tabs>
  )
};

export default NavBar;
