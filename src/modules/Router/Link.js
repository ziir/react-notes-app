import React from 'react';
import RouterContext from './RouterContext';

import './Link.css';

// Determine whether or not this link click should use
// pushState or replaceState from the History API.
// We assume a link click to the already current URL should trigger
// a navigation event, and a route render, but not create new History entry.
function getReplace(to, location) {
  const { pathname, search, hash } = new URL(location);
  return (pathname || '/') + (search || '') + (hash || '') === to;
}

// Raw component, exported as named for advanced use-cases:
// - not re-rendering on navigation changes (not wrapped by Context Consumer)
// - not rely on default opiniated behaviors
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
      /* handled via CSS, sets pointer-events: none */
      disabled={disabled ? 'okay' : undefined}
      /* handled by a-route directly */
      replace={replace ? 'please' : undefined}
      {...extra}
    />
  );
}

// Default export Link component.
// Provides default opiniated behaviors, re-renders on every navigation change.
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
