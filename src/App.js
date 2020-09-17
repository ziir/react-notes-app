import React from 'react';

import Router from './modules/Router';
import Header from './Header';

import routes from './routes';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router routes={routes}>
        {(children) => (
          <>
            <Header />
            <main>{children}</main>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
