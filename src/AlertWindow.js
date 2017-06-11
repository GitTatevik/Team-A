import React,{ Component } from 'react';

export default class AlertWindow extends Component{
    constructor(props){
        super(props);
        this.state = {
            confirm:false
        }
    }

    componentWillReceiveProps(newProps){
        this.setState({confirm:newProps.confirmState});
    }

    render(){
        return(
            <div className="alertWindow">
                <p className="windowText">Are you sure?</p>
                <button className="addBtn" onClick={this.state.confirm?this.props.deleteFromList:this.props.windowAction}>Yes</button>
                <button className="addBtn back" onClick={this.state.confirm?this.props.closeConfirm:this.props.closePopup}>No</button>
            </div>
        );
    }
}
