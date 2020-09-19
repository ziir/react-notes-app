import React from 'react';
import Link from './modules/Router/Link';
import ListItem from './ListItem';

import './List.css';

function List({ items, loading, error }) {
  if (loading === null) {
    return null;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <p>
        Unable to retrieve items right now.
        <br />
        {error.toString()}
      </p>
    );
  }

  if (!items || !items.length) {
    return (
      <p>
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
