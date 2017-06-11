import React from 'react';
import ReactDOM from 'react-dom';
import AdminDashboard from './AdminDashboard.js';
import { HashRouter } from 'react-router-dom';
import './StyleSheet/index.css';

ReactDOM.render(
  <HashRouter>
      <AdminDashboard />
  </HashRouter>,
document.getElementById('root'));
