import React from 'react';
import './StatusAlert.css';

export default function StatusAlert({ children, className: classNameProp }) {
  const className = ['StatusAlert', classNameProp].filter(Boolean).join(' ');
  return <p className={className}>{children}</p>;
}
