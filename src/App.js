import React, { Component } from 'react';
import AdminDashboard from './AdminDashboard.js';
//import Login from'./Login.js';
import { Switch } from 'react-router-dom'
import { Route, Redirect } from 'react-router'
import './StyleSheet/App.css';
class App extends Component {

  render() {
    return (
      <div className="global_container">
             <Switch>
              <Route exact path='/' render={() => (
                false ? (
                  <Redirect to="/login"/>
                ) : (
                  <AdminDashboard/>
                )
              )}/>
              {/*<Route path='/login' component={Login}/>*/}
              <Route path='/' exactly component={AdminDashboard}/>
            </Switch>
          </div>
    );
  }
}

export default App;
