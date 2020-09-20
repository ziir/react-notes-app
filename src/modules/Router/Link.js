import React from 'react';
import RouterContext from './RouterContext';

function getReplace(to, location) {
  const { pathname, search, hash } = new URL(location);
  return (pathname || '/') + (search || '') + (hash || '') === to;
}

export function Link({ to, className, replace, ...extra }) {
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

function ContextLink({ to, replace: replaceProp, ...extra }) {
  return (
    <RouterContext.Consumer>
      {({ location }) => (
        <Link
          to={to}
          replace={
            replaceProp !== undefined
              ? replaceProp
              : location && getReplace(to, location)
          }
          {...extra}
        />
      )}
    </RouterContext.Consumer>
  );
}

export default ContextLink;
