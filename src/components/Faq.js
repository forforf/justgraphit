import React from 'react';
import {List, ListItem, ListItemText} from '@mui/material';
import faqList from './Faq/faqList';

const listItems = faqList.map((qa, i) => (
  <ListItem key={i}>
      <ListItemText primary={qa[0]} secondary={qa[1]} />
  </ListItem>
));
const Faq = () => (
    <List>
      { listItems }
    </List>
);

export default Faq;
