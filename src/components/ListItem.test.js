import React from 'react';
import { render } from '@testing-library/react';
import RouterContext from '../modules/Router/RouterContext';
import ListItem from './ListItem';

const contextRender = (children, providerProps) => {
  return render(
    <RouterContext.Provider value={providerProps}>
      {children}
    </RouterContext.Provider>
  );
};
const item = { id: '1', title: 'Blog Post Idea' };

test('renders a list item', () => {
  const { getByRole } = contextRender(<ListItem {...item} />, {
    match: { params: {} },
  });

  const listitem = getByRole('listitem');
  expect(listitem).toBeInTheDocument();
});

test('renders a link to /view/:id, including the item title', () => {
  const { getByText } = contextRender(<ListItem {...item} />, {
    match: { params: {} },
  });

  const link = getByText(item.title);
  expect(link.getAttribute('href')).toBe(`/view/${item.id}`);
});

test('renders a link to /view/:id, including the item title', () => {
  const { getByText } = contextRender(<ListItem {...item} />, {
    match: { params: {} },
  });

  const link = getByText(item.title);
  expect(link.getAttribute('href')).toBe(`/view/${item.id}`);
});

test('renders a link without the active class if item id is not in params', () => {
  const { getByText } = contextRender(<ListItem {...item} />, {
    match: { params: {} },
  });

  const link = getByText(item.title);
  expect(link.classList.contains('ListItem-link-active')).toBe(false);
});

test('renders a link without the active class if other item id is in params', () => {
  const { getByText } = contextRender(<ListItem {...item} />, {
    match: { params: { id: '2' } },
  });

  const link = getByText(item.title);
  expect(link.classList.contains('ListItem-link-active')).toBe(false);
});

test('renders a link with the active class if item id is in params', () => {
  const { getByText } = contextRender(<ListItem {...item} />, {
    match: { params: { id: item.id } },
  });

  const link = getByText(item.title);
  expect(link.classList.contains('ListItem-link-active')).toBe(true);
});
