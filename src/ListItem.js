import React from 'react';
import Link from './modules/Router/Link';

import './ListItem.css';

function ListItem({ id, title }) {
  return (
    <li className="ListItem">
      <Link to={`/view/${id}`} className="ListItem-link">
        {title}
      </Link>
    </li>
  );
}

export default ListItem;
