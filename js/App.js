// These must be the first lines in src/index.js
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import Wrapper from './components/Wrapper';

const App = () => (
  <div className="container">
    <h1>Events</h1>
    <Wrapper />
  </div>
);

ReactDOM.render(<App />, document.getElementById("app"));