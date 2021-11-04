import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs } from '@mui/material';

const NavBar = (): JSX.Element => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (
    event: React.ChangeEvent<unknown>,
    newValue: number
  ) => {
    setValue(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange}>
      <Tab label="GraphIt" to="/" component={Link} />
      <Tab label="Editor" to="/edit" component={Link} />
      <Tab label="About" to="/about" component={Link} />
    </Tabs>
  );
};

export default NavBar;
