import React from 'react';
import { render } from '@testing-library/react';
import Edit from './Edit';

const item = {
  id: '1',
  title: 'Blog Post Idea',
  content: 'Lorem Ipsum Dolor Sit Amet',
};

const defaultProps = {
  match: {
    params: {
      id: item.id,
    },
  },
  items: null,
};

test('initially renders nothing', () => {
  const { container } = render(<Edit {...defaultProps} />);
  expect(container).toBeEmpty();
});

test('renders a message for empty items', () => {
  const { getByText } = render(<Edit {...defaultProps} items={[]} />);
  const message = getByText(/not found/);
  expect(message).toBeInTheDocument();
});
