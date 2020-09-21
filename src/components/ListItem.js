import React from 'react';
import Button from '../modules/UI/Button';
import Link from '../modules/Router/Link';
import RouterContext from '../modules/Router/RouterContext';

import './ListItem.css';

function ListItem({ id, title }) {
  return (
    <li className="ListItem">
      {/*
        / Retrieve the current route match params
        / so we can highlight the current item (being viewed or edited)
       */}
      <RouterContext.Consumer>
        {({ match }) => {
          const active = match.params.id === id;
          const className = ['ListItem-link', active && 'ListItem-link-active']
            .filter(Boolean)
            .join(' ');
          return (
            <Button as={Link} to={`/view/${id}`} className={className}>
              {title}
            </Button>
          );
        }}
      </RouterContext.Consumer>
    </li>
  );
}

export default ListItem;
