import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

test('renders the title', () => {
  const { getByText } = render(<Header />);
  const title = getByText(/react notes app/i);
  expect(title).toBeInTheDocument();
});

test('renders the logo', () => {
  const { getByRole } = render(<Header />);
  const img = getByRole('img');
  expect(img.src).toBeTruthy();
});

test('renders a link to home', () => {
  const { getByTestId } = render(<Header />);
  const link = getByTestId('home-link');
  expect(link.getAttribute('href')).toBe('/');
});

test('renders a call to action', () => {
  const { getByText } = render(<Header />);
  const link = getByText(/new note/i);
  expect(link.getAttribute('href')).toBe('/new');
});
