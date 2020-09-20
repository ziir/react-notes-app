import React from 'react';

import './Form.css';

async function handleSubmit(setSubmitting, setError, onSubmit, evt) {
  evt.preventDefault();
  setSubmitting(true);

  const formData = new FormData(evt.target);
  const item = {};
  for (let [key, value] of formData.entries()) {
    item[key] = value;
  }

  try {
    await onSubmit(item);
  } catch (err) {
    setError(err);
  } finally {
    setSubmitting(false);
  }
}

function Form({
  formId: id,
  title = '',
  content = '',
  onSubmit,
  children: renderAdjacent = null,
}) {
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState(null);

  return (
    <>
      {error && <p className="Form-Error">{error.toString()}</p>}
      <form
        id={id}
        className="Form"
        onSubmit={handleSubmit.bind(null, setSubmitting, setError, onSubmit)}
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
            defaultValue={title}
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
            placeholder="Enter markdown content here..."
            className="Form-input Form-textarea"
            disabled={submitting}
            defaultValue={content}
          ></textarea>
        </fieldset>
      </form>
      {typeof renderAdjacent === 'function' && renderAdjacent({ submitting })}
    </>
  );
}

export default Form;
