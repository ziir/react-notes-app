import React from 'react';

import Router from '../modules/Router';
import Header from './Header';
import List from './List';
import Create from './Create';
import Viewer from './Viewer';
import Edit from './Edit';
import NotFound from './NotFound';

import { initalState, reducer, LOADING, SET, ERROR } from '../modules/state';
import { retrieveItems } from '../modules/items/retrieve';

import './App.css';

/*
/ type Definition = null
/   | Component
/   | {| component: Component, locked: boolean |};
/
/ type Routes = {
/   [path: string]: Definition,
/ }
*/
const routes = {
  '/': null,
  '/view/:id': Viewer,
  /*
  / `locked` routes will nullify all ContextLink clicks.
  /  Prevent user from navigating away from the edit mode
  /  other than by clicking the "Cancel" link.
  */
  '/edit/:id': { component: Edit, locked: true },
  '/new': { component: Create, locked: true },
  '*': NotFound,
};

function App() {
  // Items list state handling. See `state` module.
  const [state, dispatch] = React.useReducer(reducer, initalState);

  // Retrieve items list from local storage on App mount.
  // item encrypted content is only retrieved when necessary.
  React.useEffect(() => {
    async function retrieveItemsOnMount() {
      const retrieval = retrieveItems();
      dispatch({ type: LOADING });
      try {
        const items = await retrieval;
        dispatch({ type: SET, payload: items && items.length ? items : [] });
      } catch (err) {
        dispatch({ type: ERROR, payload: err });
      }
    }

    retrieveItemsOnMount();
  }, []);

  return (
    <div className="App">
      {/*
        / Router as most top-level component is recommended.
        / Necessary for every context-connected to re-render upon navigation change,
        / potentially updating their `replace` behavior.
        / (using replaceState instead of pushState if clicking a link to the current URL).
        */}
      <Router routes={routes}>
        {/* Router's render prop is invoked with the router context object. */}
        {({ children: Route, component, match }) => {
          /* Add route-specific props */
          let routeProps = { dispatch };
          // eslint-disable-next-line default-case
          switch (component) {
            case Viewer:
            case Edit:
              routeProps = {
                ...routeProps,
                // We prefer rendering these components with a key to avoid
                // having to clean-up component state in complex useEffect.
                key: match.params.id,
                // These components need the list of items from local storage
                // to ensure the item being viewed / edited exists.
                items: state.items,
              };
          }

          return (
            <>
              <Header />
              <main className="App-main">
                {
                  /*
                  NotFound component should be rendered in a different layout
                  than the other routes.
                */
                  Route && component === NotFound ? (
                    <Route />
                  ) : (
                    <>
                      <section>
                        <List {...state} />
                      </section>
                      {Route && (
                        <section>
                          <Route {...routeProps} />
                        </section>
                      )}
                    </>
                  )
                }
              </main>
            </>
          );
        }}
      </Router>
    </div>
  );
}

export default App;
