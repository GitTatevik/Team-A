import React,{ Component } from 'react';
import './StyleSheet/AlertWindow.css';


export default class AlertWindow extends Component{
    render(){
        return(
            <div className="alertWindow">
                <p className="windowText">Are you sure?</p>
                <button className="addBtn" onClick={this.props.windowAction}>Yes</button>
                <button className="addBtn" onClick={this.props.closePopup}>No</button>
            </div>
        );
    }
}
