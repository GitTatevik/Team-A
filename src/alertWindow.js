import React,{ Component } from 'react';

export default class AlertWindow extends Component{
    render(){
        return(
            <div className="alertWindow">
                <button className="yesBtn">Yes</button>
                <button className="noBtn">No</button>
            </div>
        );
    }
}
