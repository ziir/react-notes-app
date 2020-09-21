import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import Form from './Form';

const item = {
  id: '1',
  title: 'Blog Post Idea',
  content: 'Lorem Ipsum Dolor Sit Amet',
};
const baseProps = {
  formId: 'test-form',
  onSubmit: () => {},
};

describe('Creation mode (minimal props)', () => {
  const defaultProps = { ...baseProps };

  test('renders a form element with the provided formId', () => {
    const { getByRole } = render(<Form {...defaultProps} />);
    const form = getByRole('form');
    expect(form.id).toBe('test-form');
  });

  test('renders a title text input', () => {
    const { getByLabelText } = render(<Form {...defaultProps} />);
    const input = getByLabelText(/title/i);
    expect(input.type).toBe('text');
  });

  test('renders a content textarea', () => {
    const { getByLabelText } = render(<Form {...defaultProps} />);
    const input = getByLabelText(/content/i);
    expect(input.nodeName).toBe('TEXTAREA');
  });

  test('renders a cancel link', () => {
    const { getByText } = render(<Form {...defaultProps} />);
    const input = getByText(/cancel/i);
    expect(input.getAttribute('href')).toBe('/');
  });

  test('calls a renderProp with the `submitting` state (initial)', () => {
    const props = { ...defaultProps, children: jest.fn() };
    render(<Form {...props} />);
    expect(props.children).toHaveBeenCalledWith({ submitting: false });
  });

  test('calls a renderProp with the `submitting` state (with submit)', async () => {
    const promise = Promise.resolve();
    const props = {
      ...defaultProps,
      onSubmit: () => {},
      children: jest.fn(),
    };
    const { getByRole } = render(<Form {...props} />);
    const form = getByRole('form');
    fireEvent.submit(form);
    await act(() => promise);
    expect(props.children).toMatchSnapshot();
  });

  test('calls onSubmit prop when submitted', async () => {
    const promise = Promise.resolve();
    const props = {
      ...defaultProps,
      onSubmit: jest.fn(() => promise),
    };

    const { getByRole, getByLabelText } = render(<Form {...props} />);

    const title = getByLabelText(/title/i);
    fireEvent.change(title, { target: { value: item.title } });

    const content = getByLabelText(/content/i);
    fireEvent.change(content, { target: { value: item.content } });

    const form = getByRole('form');
    fireEvent.submit(form);

    expect(props.onSubmit).toHaveBeenCalledWith({
      title: item.title,
      content: item.content,
    });
    await act(() => promise);
  });
});

describe('Edition mode (full props)', () => {
  const defaultProps = { ...baseProps, ...item };

  test('renders & pre-fill a title text input', () => {
    const { getByLabelText } = render(<Form {...defaultProps} />);
    const input = getByLabelText(/title/i);
    expect(input.value).toBe(item.title);
  });

  test('renders & pre-fill a content textarea', () => {
    const { getByLabelText } = render(<Form {...defaultProps} />);
    const input = getByLabelText(/content/i);
    expect(input.value).toBe(item.content);
  });

  test('renders a cancel link to the view mode', () => {
    const { getByText } = render(<Form {...defaultProps} />);
    const input = getByText(/cancel/i);
    expect(input.getAttribute('href')).toBe(`/view/${item.id}`);
  });
});
