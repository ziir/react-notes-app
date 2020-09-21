import React from 'react';
import { waitFor, render, fireEvent, act } from '@testing-library/react';
import Create from './Create';

const defaultProps = {
  dispatch: () => {},
};

const item = {
  id: '1',
  title: 'Blog Post Idea',
  content: 'Lorem Ipsum Dolor Sit Amet',
};

test('renders a form element with the pre-defined formId', () => {
  const { getByRole } = render(<Create {...defaultProps} />);
  const form = getByRole('form');
  expect(form.id).toBe('create-form');
});

test('renders a submit button', () => {
  const { getByText } = render(<Create {...defaultProps} />);
  const button = getByText('Create');
  expect(button.getAttribute('form')).toBe('create-form');
  expect(button.disabled).toBe(false);
});
