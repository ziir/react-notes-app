import React from 'react';
import Link from '../modules/Router/Link';
import RouterContext from '../modules/Router/RouterContext';

import './ListItem.css';

function ListItem({ id, title }) {
  return (
    <li className="ListItem">
      <RouterContext.Consumer>
        {({ match }) => {
          const active = match.params.id === id;
          const className = ['ListItem-link', active && 'ListItem-link-active']
            .filter(Boolean)
            .join(' ');
          return (
            <Link to={`/view/${id}`} className={className}>
              {title}
            </Link>
          );
        }}
      </RouterContext.Consumer>
    </li>
  );
}

export default ListItem;
