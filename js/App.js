import 'promise-polyfill/src/polyfill';
import 'unfetch/polyfill';
import 'abortcontroller-polyfill';
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