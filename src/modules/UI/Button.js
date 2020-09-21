import React from 'react';
import './Button.css';

export default function Button({
  className: classNameProp,
  as: asProp,
  ...extra
}) {
  // Allow a <Button> to be rendered with an underlying component.
  // use-case: <Button as={Link} /> for a link styled as a button.
  const Component = asProp || 'button';
  const className = ['Button', classNameProp].filter(Boolean).join(' ');
  return <Component className={className} {...extra} />;
}
