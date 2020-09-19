import React from 'react';

import Router from './modules/Router';
import Header from './Header';
import List from './List';
import Create from './Create';

import { initalState, reducer, LOADING, SET, ERROR } from './modules/state';
import { retrieveItems } from './modules/items';

import './App.css';

const routes = {
  '/': null,
  '/new': Create,
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
        {(Route) => (
          <>
            <Header />
            <main className="App-main">
              <section>
                <List {...state} />
              </section>
              {Route && (
                <section>
                  <Route dispatch={dispatch} />
                </section>
              )}
            </main>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
