import React from 'react';

import Router from './modules/Router';
import Header from './Header';
import List from './List';

import routes from './routes';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router routes={routes}>
        {(children) => (
          <>
            <Header />
            <main className="App-main">
              <section>
                <List />
              </section>
              {children && <section>{children}</section>}
            </main>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
