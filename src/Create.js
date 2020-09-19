import React from 'react';

import useRouter from './modules/Router/useRouter';
import { saveItem } from './modules/storage';
import { encrypt } from './modules/encryption';
import generateId from './modules/id';
import { ADD } from './modules/state';

import './Create.css';
import './Form.css';

async function handleSubmit(setSubmitting, dispatch, router, evt) {
  evt.preventDefault();
  setSubmitting(true);

  const formData = new FormData(evt.target);
  const item = {};
  for (let [key, value] of formData.entries()) {
    item[key] = value;
  }

  item.id = generateId();
  item.content = await encrypt(item.content);

  saveItem(item);
  dispatch({ type: ADD, payload: { id: item.id, title: item.title } });
  router.navigate(`/view/${item.id}`);
}

function Create({ dispatch }) {
  const [submitting, setSubmitting] = React.useState(false);
  const router = useRouter();

  return (
    <div className="Create">
      <form
        id="create-form"
        className="Form"
        onSubmit={handleSubmit.bind(null, setSubmitting, dispatch, router)}
      >
        <fieldset className="Form-fieldset">
          <label className="Form-label" htmlFor="title-input">
            Title
          </label>
          <input
            required
            autoFocus
            type="text"
            name="title"
            id="title-input"
            disabled={submitting}
            className="Form-input"
            placeholder="Enter title here..."
          />
        </fieldset>
        <fieldset className="Form-fieldset">
          <label className="Form-label" htmlFor="content-input">
            Content
          </label>
          <textarea
            id="content-input"
            name="content"
            rows="10"
            placeholder="Enter content here..."
            className="Form-input Form-textarea"
            disabled={submitting}
          ></textarea>
        </fieldset>
      </form>
      <button
        type="submit"
        form="create-form"
        className="Create-button"
        disabled={submitting}
      >
        Create
      </button>
    </div>
  );
}

export default Create;
