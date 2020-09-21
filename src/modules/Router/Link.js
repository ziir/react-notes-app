import React from 'react';
import RouterContext from './RouterContext';

import './Link.css';

function getReplace(to, location) {
  const { pathname, search, hash } = new URL(location);
  return (pathname || '/') + (search || '') + (hash || '') === to;
}

export function Link({
  to,
  disabled,
  className: classNameProp,
  replace,
  ...extra
}) {
  const className = ['Link', classNameProp].filter(Boolean).join(' ');

  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a
      is="a-route"
      href={to}
      class={className}
      disabled={disabled ? 'okay' : undefined}
      replace={replace ? 'please' : undefined}
      {...extra}
    />
  );
}

function ContextLink({
  to,
  disabled: disabledProp,
  replace: replaceProp,
  ...extra
}) {
  return (
    <RouterContext.Consumer>
      {({ location, locked }) => (
        <Link
          to={to}
          disabled={disabledProp !== undefined ? disabledProp : locked}
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
