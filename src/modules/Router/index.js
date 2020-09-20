/* eslint-disable: no-restricted-globals */

import React from 'react';
import useRouter from './useRouter';
import RouterContext from './RouterContext';

function notFound() {
  return '404 Not Found';
}

function makeHandler(route, Component, router, setContext) {
  return function handler_(match) {
    setContext({
      route,
      location: window.location,
      match,
      component: Component,
      children: Component
        ? function Route(props) {
            return <Component router={router} match={match} {...props} />;
          }
        : null,
    });
  };
}

export function Router({
  children: childrenProp,
  routes: _routes = {},
  ...extra
}) {
  const router = useRouter();
  const routesRef = React.useRef(null);
  const [context, setContext] = React.useState({
    route: null,
    children: null,
    location: null,
    match: null,
    component: null,
  });

  React.useEffect(() => {
    const registered = Object.keys(routesRef.current || {});
    if (registered.length) {
      registered.forEach((path) =>
        router.delete(path, routesRef.current[path].handler)
      );
      routesRef.current = {};
    }

    const paths = Object.keys(_routes).filter((path) => path !== '*');
    if (paths.length) {
      const newRoutes = paths.reduce((acc, path) => {
        const component = _routes[path];
        const handler = makeHandler(path, component, router, setContext);
        router.get(path, handler);
        acc[path] = {
          component,
          handler,
        };
        return acc;
      }, {});

      const notFoundPath = '*';
      const notFoundComponent = _routes[notFoundPath] || notFound;
      const notFoundHandler = makeHandler(
        notFoundPath,
        notFoundComponent,
        router,
        setContext
      );
      newRoutes[notFoundPath] = {
        component: notFoundComponent,
        handler: notFoundHandler,
      };
      router.get(notFoundPath, notFoundHandler);
      routesRef.current = newRoutes;

      const { pathname, search, hash } = new URL(window.location);
      router.navigate(pathname + search + hash, 'replace');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_routes]);

  return (
    <RouterContext.Provider value={context}>
      {childrenProp(context)}
    </RouterContext.Provider>
  );
}

export default Router;
