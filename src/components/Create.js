import React from 'react';

import useRouter from '../modules/Router/useRouter';
import { saveItem } from '../modules/storage';
import { encrypt } from '../modules/encryption';
import generateId from '../modules/id';
import { ADD } from '../modules/state';

import Form from './Form';

import './Create.css';

function Create({ dispatch }) {
  const router = useRouter();

  async function handleSubmit(item) {
    item.id = generateId();
    item.content = await encrypt(item.content);

    saveItem(item);
    dispatch({ type: ADD, payload: { id: item.id, title: item.title } });
    router.navigate(`/view/${item.id}`);
  }

  return (
    <div className="Create">
      <Form formId="create-form" onSubmit={handleSubmit}>
        {({ submitting }) => (
          <button
            type="submit"
            form="create-form"
            className="Create-button"
            disabled={submitting}
          >
            Create
          </button>
        )}
      </Form>
    </div>
  );
}

export default Create;
