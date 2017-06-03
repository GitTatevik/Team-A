import './StyleSheet/Dashboard.css';
import React, { Component } from 'react';
import Table from './TableComponent/Table.js'
import Header from "./Header.js"
import Menu from "./Menu.js";
import MailingLists from'./MailingLists/MailingLists';
import SendEmails from './SendEmails.js';



import { Switch } from 'react-router-dom';
import { Route, Redirect} from 'react-router';

class AdminDashboard extends Component{
  render(){
    return(
      <div  className="return ">
            
              <Header/>
              <Menu/>
            
            <main role="main"  >
       <Switch>
				      <Route path='/table' component={Table}/>
							<Route path='/addmailinglist' component={MailingLists}/>
              <Route path='/sendemails' component={SendEmails}/>
              <Redirect to="/table"/>
				</Switch>
        </main>
      </div>
    );
  }

}
export default AdminDashboard;