import React from 'react';
import { render } from '@testing-library/react';
import NotFound from './NotFound';

test('renders content', () => {
  const { getByText } = render(<NotFound />);
  const title = getByText(/not found/i);
  expect(title).toBeInTheDocument();
});
