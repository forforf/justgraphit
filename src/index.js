import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Pages
import About from './pages/About';

ReactDOM.render((
    <div>
      <h1> Index </h1>
      <App />
    </div>

  ), document.getElementById('root')
);
