import React from 'react';
import { render } from '@testing-library/react';
import RouterContext from '../modules/Router/RouterContext';
import List from './List';

test('renders a loader', () => {
  const { getByText } = render(
    <List items={null} loading={true} error={null} />
  );
  const node = getByText(/loading/i);
  expect(node).toBeInTheDocument();
});

test('renders an error message', () => {
  const { getByText } = render(
    <List items={null} loading={false} error={new Error('error')} />
  );
  const node = getByText(/unable to retrieve notes/i);
  expect(node).toBeInTheDocument();
});

test('renders a placeholder and a call to action', () => {
  const { getByText } = render(
    <List items={[]} loading={false} error={null} />
  );

  const placeholder = getByText(/no notes/i);
  expect(placeholder).toBeInTheDocument();

  const calltoaction = getByText(/new note/i);
  expect(calltoaction.getAttribute('href')).toBe('/new');
});

test('renders a list of items', () => {
  const contextRender = (children, providerProps) => {
    return render(
      <RouterContext.Provider value={providerProps}>
        {children}
      </RouterContext.Provider>
    );
  };

  const { getByRole, getAllByRole } = contextRender(
    <List
      items={[
        { id: '1', title: 'Blog Post Idea' },
        { id: '2', title: 'groceries list' },
      ]}
      loading={false}
      error={null}
    />,
    { match: { params: {} } }
  );

  const list = getByRole('list');
  expect(list).toBeInTheDocument();

  const elements = getAllByRole('listitem');
  expect(elements).toHaveLength(2);
});
