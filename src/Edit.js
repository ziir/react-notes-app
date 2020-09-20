import React from 'react';

import Loader from './Loader';
import useRouter from './modules/Router/useRouter';
import { Link } from './modules/Router/Link';
import { saveItem, deleteItem } from './modules/storage';
import { encrypt } from './modules/encryption';
import useItem from './modules/items/useItem';
import { UPDATE, DELETE } from './modules/state';

import Form from './Form';

import './Edit.css';

function Edit({
  match: {
    params: { id },
  },
  items,
  dispatch,
}) {
  const router = useRouter();
  const { status, item } = useItem(items, id);

  async function handleSubmit(updated) {
    updated.content = await encrypt(updated.content);

    saveItem({ id, ...updated });
    dispatch({ type: UPDATE, payload: { id, title: updated.title } });
    router.navigate(`/view/${id}`);
  }

  function handleDeleteClick(evt) {
    evt.preventDefault();

    deleteItem(id);
    dispatch({ type: DELETE, payload: id });
    router.navigate('/');
  }

  if (status === 'not-found') {
    return <p className="Edit-status">Item not found.</p>;
  }

  if (status === 'loading') {
    return (
      <p className="Edit-status">
        <Loader className="Edit-loader" />
      </p>
    );
  }

  if (status === 'storage-error') {
    return <p className="Edit-status">Unable to retrieve item from storage.</p>;
  }

  if (status === 'decryption-error') {
    return <p className="Edit-status">Unable to decrypt item content.</p>;
  }

  if (status === 'ready' && item) {
    return (
      <div className="Edit">
        <Form {...item} formId="edit-form" onSubmit={handleSubmit}>
          {({ submitting }) => (
            <div className="Edit-actions">
              <Link
                className="Edit-cancel-link"
                disabled={submitting}
                to={`/view/${id}`}
              >
                Cancel
              </Link>
              <button
                type="submit"
                form="edit-form"
                className="Edit-button"
                disabled={submitting}
              >
                Update
              </button>
              <button
                type="button"
                className="Edit-button Edit-delete-button"
                disabled={submitting}
                onClick={handleDeleteClick}
              >
                Delete
              </button>
            </div>
          )}
        </Form>
      </div>
    );
  }

  return null;
}

export default Edit;
