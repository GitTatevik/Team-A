import React, { Component } from 'react';
import './StyleSheet/Header.css';
import { NavLink } from 'react-router-dom';
import './StyleSheet/Header.css';

export default class Header extends Component{
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
                 <div className="icon_item"/>
                 <div className="icon_item"/>
                 <div className="icon_item"/>
             </div>
<<<<<<< HEAD
              <div className="header flex">
                  <div className="logo">
                      <h1>Bet CRM</h1>
                  </div>
              </div>
         </div>
=======
             <div className="header flex">
                 <div className="logo">
                   <h1>Bet CRM</h1>
                 </div>
                 <div className="user flex">
                    <ul className="list flex"></ul>
                 </div>
             </div>
            </div>
>>>>>>> 48acb940f43b7c98dc05cc5e9d7c4d8306667d7d

         <div id="sidenav" style={{width:this.state.width}}>
             <div className="close_icon" onClick={this.closeNav}>
                 <div className="close_item"/>
                 <div className="close_item"/>
             </div>
             <ul className="menu_list">
                 <li className="menu_item"><NavLink activeClassName="active" to='/contacts'>Contacts</NavLink></li>
                 <li className="menu_item"><NavLink activeClassName="active" to='/mailinglist'>Mailing list </NavLink></li>
             </ul>
         </div>
      </div>
    );
  }
}

