import React from 'react';
import RouterContext from './RouterContext';

function getReplace(to) {
  const { pathname, search, hash } = new URL(window.location);
  return (pathname || '/') + (search || '') + (hash || '') === to;
}

export function Link({ to, className, replace: replaceProp, ...extra }) {
  const replace = replaceProp !== undefined ? replaceProp : getReplace(to);

  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a
      is="a-route"
      href={to}
      class={className}
      replace={replace ? 'please' : undefined}
      {...extra}
    />
  );
}

function ContextLink(props) {
  return (
    <RouterContext.Consumer>{() => <Link {...props} />}</RouterContext.Consumer>
  );
}

export default ContextLink;
