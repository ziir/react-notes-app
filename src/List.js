import React from 'react';
import Link from './modules/Router/Link';

function retrieveItems() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // return reject(new Error('Quota exceeded'));
      resolve();
    }, 2000);
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

  return items.map((item) => JSON.stringify(item, null, 2));
}

export default List;
