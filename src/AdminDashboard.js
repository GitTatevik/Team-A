import './StyleSheet/Dashboard.css';
import React, { Component } from 'react';
import Table from './TableComponent/Table.js'
import Header from "./Header.js"
import Menu from "./Menu.js";
import MailingLists from'./MailingLists/MailingLists';
import SendEmails from './SendEmails.js';
import { Switch } from 'react-router-dom';
import { Route, Redirect} from 'react-router';

export default class AdminDashboard extends Component{
  render(){
    return(
      <div  className="return ">
<<<<<<< HEAD
          <Header/>
          <Menu/>
          <main role="main"  >
              <Switch>
                  <Route path='/contacts' component={Table}/>
                  <Route path='/mailinglist' component={MailingLists}/>
                  <Route path='/sendemails' component={SendEmails}/>
                  <Redirect to="/contacts"/>
              </Switch>
          </main>
=======
              <Header/>
              <Menu/>
            <main role="main">
      		 <Switch>
			 <Route path='/contacts' component={Table}/>
			 <Route path='/mailinglist' component={MailingLists}/>
			 <Route path='/sendemails' component={SendEmails}/>
			 <Redirect to="/contacts"/>
		 </Switch>
            </main>
>>>>>>> 48acb940f43b7c98dc05cc5e9d7c4d8306667d7d
      </div>
    );
  }
}
