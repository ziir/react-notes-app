import React from 'react';
import Button from '../modules/UI/Button';
import Loader from '../modules/UI/Loader';
import StatusAlert from '../modules/UI/StatusAlert';
import { Link } from '../modules/Router/Link';
import useItem from '../modules/items/useItem';

import './Viewer.css';

function Viewer({
  // Injected by the Router
  match: {
    params: { id },
  },
  // Injected by the App root, as part of route props
  items,
}) {
  // Retrieve current item
  // (matched against the state, decrypted, content markdown rendered)
  // See src/modules/items/useItem.js
  const { status, item } = useItem(items, id, true);

  if (status === 'not-found') {
    return <StatusAlert>Note not found.</StatusAlert>;
  }

  if (status === 'loading') {
    return (
      <StatusAlert className="Viewer-loader">
        <Loader />
      </StatusAlert>
    );
  }

  if (status === 'storage-error') {
    return <StatusAlert>Unable to retrieve note from storage.</StatusAlert>;
  }

  if (status === 'decryption-error') {
    return <StatusAlert>Unable to decrypt note content.</StatusAlert>;
  }

  if (status === 'parsing-error') {
    return <StatusAlert>Unable to parse note content.</StatusAlert>;
  }

  if (status === 'ready' && item) {
    return (
      <div className="Viewer">
        <article className="Viewer-inner">
          <h2 className="Viewer-title">{item.title}</h2>
          <div
            className="Viewer-content markdown-container"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        </article>
        <Button as={Link} className="Viewer-edit-link" to={`/edit/${item.id}`}>
          Edit
        </Button>
      </div>
    );
  }

  return null;
}

export default Viewer;
