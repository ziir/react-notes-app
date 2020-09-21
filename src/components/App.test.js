import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders the Header', () => {
  const { getByRole } = render(<App />);
  const title = getByRole('banner');
  expect(title).toBeInTheDocument();
});

test('renders the main container', () => {
  const { getByRole } = render(<App />);
  const title = getByRole('main');
  expect(title).toBeInTheDocument();
});

test('renders the list section', () => {
  const { getByTestId } = render(<App />);
  const title = getByTestId('list-section');
  expect(title).toBeInTheDocument();
});
