import React from 'react';
import Loader from './Loader';
import { getItemContent } from './modules/storage';
import { decrypt } from './modules/encryption';

import './Viewer.css';

function Viewer({
  location: {
    params: { id },
  },
  items,
  dispatch,
}) {
  const [{ status, item }, setState] = React.useState({
    status: 'init',
    item: null,
  });

  React.useEffect(() => {
    if (!items) return;

    // check for existence of item w/ matching id
    // perform async transformation on item's content
    // keep track of different states:
    // - not found
    // - loading
    // - storage error
    // - decryption error
    // - item ready
    async function retrieveFullItemOnMount() {
      const match = items.find((candidate) => candidate.id === id);
      if (!match) return setState({ status: 'not-found', item: null });

      setState({ status: 'loading', item: null });
      let content = null;
      try {
        content = getItemContent(id);
      } catch (err) {
        console.error(err);
        return setState({ status: 'storage-error', item: null });
      }

      try {
        content = await decrypt(content);
      } catch (err) {
        console.error(err);
        return setState({ status: 'decryption-error', item: null });
      }

      setState({ status: 'ready', item: { ...match, content } });
    }

    retrieveFullItemOnMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  if (status === 'not-found') {
    return <p>Item not found.</p>;
  }

  if (status === 'loading') {
    return (
      <p className="Viewer-status">
        <Loader className="Viewer-loader" />
      </p>
    );
  }

  if (status === 'storage-error') {
    return <p>Unable to retrieve item from storage.</p>;
  }

  if (status === 'decryption-error') {
    return <p>Unable to decrypt item content.</p>;
  }

  if (status === 'ready' && item) {
    return (
      <article>
        <h2>{item.title}</h2>
        <p>{item.content}</p>
      </article>
    );
  }

  return null;
}

export default Viewer;
