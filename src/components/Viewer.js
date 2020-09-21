import React from 'react';
import Loader from '../modules/UI/Loader';
import Link from '../modules/Router/Link';
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
    return <p className="Viewer-status">Item not found.</p>;
  }

  if (status === 'loading') {
    return (
      <p className="Viewer-status">
        <Loader className="Viewer-loader" />
      </p>
    );
  }

  if (status === 'storage-error') {
    return (
      <p className="Viewer-status">Unable to retrieve item from storage.</p>
    );
  }

  if (status === 'decryption-error') {
    return <p className="Viewer-status">Unable to decrypt item content.</p>;
  }

  if (status === 'parsing-error') {
    return <p className="Viewer-status">Unable to parse item content.</p>;
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
        <Link className="Viewer-edit-link" to={`/edit/${item.id}`}>
          Edit
        </Link>
      </div>
    );
  }

  return null;
}

export default Viewer;
