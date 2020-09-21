import React from 'react';

import Button from '../modules/UI/Button';
import Loader from '../modules/UI/Loader';
import StatusAlert from '../modules/UI/StatusAlert';

import useRouter from '../modules/Router/useRouter';
import { saveItem, deleteItem } from '../modules/storage';
import { encrypt } from '../modules/encryption';
import useItem from '../modules/items/useItem';
import { UPDATE, DELETE } from '../modules/state';

import Form from './Form';

import './Edit.css';

function Edit({
  // Injected by the Router
  match: {
    params: { id },
  },
  // Injected by the App root, as part of route props
  items,
  dispatch,
}) {
  const router = useRouter();
  const { status, item } = useItem(items, id);

  // Assuming encryption cannot fail.
  // May be necessary to either:
  // - manage local error state + message
  // - dispatch({ type: ERROR }) for a ~global error state handling
  async function handleSubmit(updated) {
    updated.content = await encrypt(updated.content);

    // Save encrypted item to local storage.
    saveItem({ id, ...updated });
    // Add minimal item to items list ~global state.
    dispatch({ type: UPDATE, payload: { id, title: updated.title } });
    router.navigate(`/view/${id}`);
  }

  function handleDeleteClick(evt) {
    evt.preventDefault();

    // Delete item from local storage.
    deleteItem(id);
    // Delete item from items list ~global state.
    dispatch({ type: DELETE, payload: id });
    router.navigate('/');
  }

  if (status === 'not-found') {
    return <StatusAlert>Item not found.</StatusAlert>;
  }

  if (status === 'loading') {
    return (
      <StatusAlert className="Edit-loader">
        <Loader />
      </StatusAlert>
    );
  }

  if (status === 'storage-error') {
    return <StatusAlert>Unable to retrieve item from storage.</StatusAlert>;
  }

  if (status === 'decryption-error') {
    return <StatusAlert>Unable to decrypt item content.</StatusAlert>;
  }

  if (status === 'ready' && item) {
    return (
      <div className="Edit">
        {/* <Form> handles can handle both creation & edition */}
        <Form {...item} formId="edit-form" onSubmit={handleSubmit}>
          {({ submitting }) => (
            <div className="Edit-actions">
              <Button type="submit" form="edit-form" disabled={submitting}>
                Update
              </Button>
              <Button
                type="button"
                className="Edit-delete-button"
                disabled={submitting}
                onClick={handleDeleteClick}
              >
                Delete
              </Button>
            </div>
          )}
        </Form>
      </div>
    );
  }

  return null;
}

export default Edit;
