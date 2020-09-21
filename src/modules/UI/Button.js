import React from 'react';
import './Button.css';

export default function Button({
  className: classNameProp,
  as: asProp,
  ...extra
}) {
  const Component = asProp || 'button';
  const className = ['Button', classNameProp].filter(Boolean).join(' ');
  return <Component className={className} {...extra} />;
}
