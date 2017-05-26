import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import './StyleSheet/index.css';

ReactDOM.render(
<HashRouter>
  <App/>
</HashRouter>
, document.getElementById('root'));
registerServiceWorker();
