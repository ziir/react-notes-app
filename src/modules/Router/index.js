import React from 'react';
import useRouter from './useRouter';
import RouterContext from './RouterContext';

// Default not-found component.
function notFound() {
  return '404 Not Found';
}

// Build the function that'll be invoked on every navigation.
function makeHandler(route, Component, locked, router, setContext) {
  // route match object provided by a-route
  return function handler_(match) {
    // The router context is updated at this occasion
    // so that all its consumers are re-rendered.
    // Allows for links "replace mode" and "locked routes".
    setContext({
      route,
      location: window.location,
      match,
      locked,
      component: Component,
      // Final component being rendered, wrapping the component defined for the route.
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
    locked: null,
  });

  // On every `routes` prop change:
  // - unregister previously registered routes if any.
  // - register new routes if any.
  // - register catch-otherwise route on `*` path to not miss any navigations,
  //   even outside of registered routes.
  React.useEffect(() => {
    // unregister
    const registered = Object.keys(routesRef.current || {});
    if (registered.length) {
      registered.forEach((path) =>
        router.delete(path, routesRef.current[path].handler)
      );
      routesRef.current = {};
    }

    // register non-wildcard routes
    const paths = Object.keys(_routes).filter((path) => path !== '*');
    if (paths.length) {
      const newRoutes = paths.reduce((acc, path) => {
        // handle the different types/shapes of route definitions.
        const definition = _routes[path];
        const extended = definition && typeof definition === 'object';
        const component = extended ? definition.component : definition;
        const locked = extended ? !!definition.locked : false;
        // retrieve the route handler to pass to a-route's router.get(path, handler).
        const handler = makeHandler(
          path,
          component,
          locked,
          router,
          setContext
        );
        router.get(path, handler);
        // keep track registered routes, only for debugging purposes.
        acc[path] = {
          definition,
          handler,
        };
        return acc;
      }, {});

      // register the wildcard route separately.
      const notFoundPath = '*';
      // but use the provided component if any, or fallback on default.
      const notFoundComponent = _routes[notFoundPath] || notFound;
      const notFoundHandler = makeHandler(
        notFoundPath,
        notFoundComponent,
        // wildcard route cannot benefit from "locked mode".
        false,
        router,
        setContext
      );
      newRoutes[notFoundPath] = {
        definition: notFoundComponent,
        handler: notFoundHandler,
      };
      router.get(notFoundPath, notFoundHandler);
      routesRef.current = newRoutes;

      // Trigger initial navigation
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
