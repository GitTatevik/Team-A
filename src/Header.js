import './StyleSheet/Header.css';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component{
    constructor(){
        super();
        this.state={width:"0"};
        this.openNav = this.openNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
    }

    openNav() {
        this.setState({width:"250px"});
    }

    closeNav() {
        this.setState({width:"0"});
    }


  render(){
    return(
      <div className="header_container flex">
         <div className="row flex">
             <div className="menu_icon" id="menu_icon" onClick={this.openNav}>
                 <div className="icon_item"></div>
                 <div className="icon_item"></div>
                 <div className="icon_item"></div>
             </div>
              <div className="header flex">
                  <div className="logo">
                      <h1>BetBoard</h1>
                  </div>
                  <div className="user flex">
                      <ul className="list flex">
                          {/*<li className="list_item">Username</li>*/}
                          {/*<li className="list_item"><NavLink activeClassName="active" to='/login'>Log out</NavLink></li>*/}
                      </ul>
                  </div>
              </div>
         </div>

         <div id="sidenav" style={{width:this.state.width}}>
             <div className="close_icon" onClick={this.closeNav}>
                 <div className="close_item"></div>
                 <div className="close_item"></div>
             </div>
             <ul className="menu_list">
                 <li className="menu_item"><NavLink activeClassName="active" to='/table'>Contacts</NavLink></li>
                {/* <li className="menu_item"><NavLink activeClassName="active" to='/addmailinglist'>MailList </NavLink></li>
                 <li className="menu_item"><NavLink activeClassName="active" to='/sendemails'> Send Email </NavLink></li>
                 <li className="menu_item"><NavLink activeClassName="active" to='/login'>Log Out </NavLink></li>*/}
             </ul>
         </div>
      </div>
    );
  }
}

export default Header;
