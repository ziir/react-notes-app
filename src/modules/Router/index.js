/* eslint-disable: no-restricted-globals */

import React from 'react';
import useRouter from './useRouter';
import RouterContext from './RouterContext';

function notFound() {
  return '404 Not Found';
}

function makeHandler(path, Component, setChildren, router, setContext) {
  return function handler_(ctx, next) {
    console.log('Handling for ', path, Component, next);
    setContext({ symbol: Symbol(), router });
    setChildren(Component && <Component router={router} ctx={ctx} />);
  };
}

function Router({ children: childrenProp, routes: _routes = {} }) {
  const router = useRouter();
  const [routes, setRoutes] = React.useState(_routes);
  const [children, setChildren] = React.useState(null);
  const [context, setContext] = React.useState({ symbol: Symbol(), router });

  React.useEffect(() => {
    const registered = Object.keys(routes);
    if (registered.length) {
      registered.forEach(router.delete);
      setChildren(null);
      setRoutes({});
    }

    const paths = Object.keys(_routes).filter((path) => path !== '*');
    if (paths.length) {
      const newRoutes = paths.reduce((acc, path) => {
        const component = _routes[path];
        const handler = makeHandler(
          path,
          component,
          setChildren,
          router,
          setContext
        );
        router.get(path, handler);
        acc[path] = {
          path,
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
        setChildren,
        router,
        setContext
      );
      newRoutes[notFoundPath] = {
        component: notFoundComponent,
        handler: notFoundHandler,
      };
      router.get(notFoundPath, notFoundHandler);
      setRoutes(newRoutes);

      const { pathname, search, hash } = new URL(window.location);
      router.navigate(pathname + search + hash, 'replace');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_routes]);

  return (
    <RouterContext.Provider value={context}>
      {childrenProp(children)}
    </RouterContext.Provider>
  );
}

export default Router;
