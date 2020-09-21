import React from 'react';
import Button from '../modules/UI/Button';
import Loader from '../modules/UI/Loader';
import StatusAlert from '../modules/UI/StatusAlert';
import { Link } from '../modules/Router/Link';
import useItem from '../modules/items/useItem';

import './Viewer.css';

function Viewer({
  match: {
    params: { id },
  },
  items,
  dispatch,
}) {
  const { status, item } = useItem(items, id, true);

  if (status === 'not-found') {
    return <StatusAlert>Item not found.</StatusAlert>;
  }

  if (status === 'loading') {
    return (
      <StatusAlert>
        <Loader className="Viewer-loader" />
      </StatusAlert>
    );
  }

  if (status === 'storage-error') {
    return <StatusAlert>Unable to retrieve item from storage.</StatusAlert>;
  }

  if (status === 'decryption-error') {
    return <StatusAlert>Unable to decrypt item content.</StatusAlert>;
  }

  if (status === 'parsing-error') {
    return <StatusAlert>Unable to parse item content.</StatusAlert>;
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
