
import React from 'react';
import {List, ListItem} from 'material-ui/List';
import faqList from './faqList';

const listItems = faqList.map((qa, i) => <ListItem key={i} primaryText={qa[0]} secondaryText={qa[1]} />);
const Faq = () => (
    <List>
      { listItems }
    </List>
);

export default Faq;
