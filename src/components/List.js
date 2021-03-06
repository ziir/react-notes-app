import React from 'react';
import Link from '../modules/Router/Link';
import Loader from '../modules/UI/Loader';
import StatusAlert from '../modules/UI/StatusAlert';
import ListItem from './ListItem';

import './List.css';

function List({ items, loading, error }) {
  if (loading === null) {
    return null;
  }

  if (loading) {
    return (
      <StatusAlert className="List-loader">
        <Loader />
      </StatusAlert>
    );
  }

  if (error) {
    return (
      <StatusAlert>
        Unable to retrieve notes right now.
        <br />
        {error.toString()}
      </StatusAlert>
    );
  }

  if (!items || !items.length) {
    return (
      <StatusAlert>
        No notes, yet.
        <br />
        <Link to="/new">Create a new note.</Link>
      </StatusAlert>
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
