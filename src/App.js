import React from 'react';

import Router from './modules/Router';
import Header from './Header';
import List from './List';
import Create from './Create';
import Viewer from './Viewer';

import { initalState, reducer, LOADING, SET, ERROR } from './modules/state';
import { retrieveItems } from './modules/items';

import './App.css';

const routes = {
  '/': null,
  '/new': Create,
  '/view/:id': Viewer,
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, initalState);

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
      <Router routes={routes}>
        {({ children: Route, component, location }) => {
          let routeProps = { dispatch };
          if (component === Viewer) {
            routeProps = {
              ...routeProps,
              key: location.params.id,
              items: state.items,
            };
          }

          return (
            <>
              <Header />
              <main className="App-main">
                <section>
                  <List {...state} />
                </section>
                {Route && (
                  <section>
                    <Route {...routeProps} />
                  </section>
                )}
              </main>
            </>
          );
        }}
      </Router>
    </div>
  );
}

export default App;
