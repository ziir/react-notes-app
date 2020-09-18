import React from 'react';
import Link from './modules/Router/Link';
import { getAllItems } from './modules/storage';
import ListItem from './ListItem';

import './List.css';

function retrieveItems() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const items = getAllItems();
      resolve(items);
    }, 500);
  });
}

function List() {
  const [items, setItems] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(null);

  React.useEffect(() => {
    async function retrieveItemsOnMount() {
      setLoading(true);
      try {
        const items = await retrieveItems();
        if (items && items.length) {
          setItems(items);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    retrieveItemsOnMount();
  }, []);

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

  if (!items.length) {
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
