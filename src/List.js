import React from 'react';
import Link from './modules/Router/Link';
import ListItem from './ListItem';
import Loader from './Loader';

import './List.css';

function List({ items, loading, error }) {
  if (loading === null) {
    return null;
  }

  if (loading) {
    return (
      <p className="List-status">
        <Loader className="List-loader" />
      </p>
    );
  }

  if (error) {
    return (
      <p className="List-status">
        Unable to retrieve items right now.
        <br />
        {error.toString()}
      </p>
    );
  }

  if (!items || !items.length) {
    return (
      <p className="List-status">
        No items, yet.
        <br />
        <Link to="/new">Create a new item.</Link>
      </p>
    );
  }

  return (
    <ul className="List">
      {items.map((item) => (
        <ListItem key={item.id} id={item.id} title={item.title} />
      ))}
    </ul>
  );
}

export default List;
