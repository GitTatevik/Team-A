import React, { Component } from 'react';
import AdminDashboard from './AdminDashboard.js';
import './StyleSheet/App.css';

export default class App extends Component {
  render() {
    return (
      <div className="global_container" >
        <AdminDashboard/>
      </div>
    );
  }
}

