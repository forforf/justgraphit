
// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
//
it.skip('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

// Testing is not compatible with using node_modules as
// a project directory (for other than node imports)

