import React, {Component} from 'react';
import '../StyleSheet/MailingLists.css';
import call from '../Fetch.js';
import MailingListContacts from './MailingListContacts.js';
import TemplateSelect from '../TableComponent/TemplateSelect.js';
import '../StyleSheet/Table.css';
import Overlay from "../TableComponent/Overlay";
import AlertWindow from '../AlertWindow';
import Window from '../Window';

class MailingLists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maillists: [],
            mailListContacts: [],
            mailListHeader: "",
            mailListId:0,
            checkedMailLists:0,
            templatePopup:false,
            alertWindow:false,
            sendFunction:false,
            deleteFunction:false,
            lineNum:0,
            responseWindow:false,
            responseText:''
        };
         this.seeContacts = this.seeContacts.bind(this);
         this.deleteMailingList = this.deleteMailingList.bind(this);
         this.update = this.update.bind(this);
         this.getValue= this.getValue.bind(this);
         this.sendToAll =this.sendToAll.bind(this);
         this.popupCancel = this.popupCancel.bind(this);
         this.getNewContactList = this.getNewContactList.bind(this);
         this.showSendWindow = this.showSendWindow.bind(this);
         this.showDeleteWindow = this.showDeleteWindow.bind(this);
        this.getResponseText = this.getResponseText.bind(this);
         this.tableRows = [];
         this.TemplateId = "";
         this.checkedMailLists = "";
    }
    sendToAll(){
        call('http://crmbeta.azurewebsites.net/api/EmailSender/' + this.state.maillists[this.state.lineNum].EmailListID +'/'+ this.TemplateId ,  'POST')
            .then(() => {
                this.update();
           });
        this.popupCancel();
    }

   deleteMailingList() {
        call('http://crmbeta.azurewebsites.net/api/EmailLists/delete/' + this.state.maillists[this.state.lineNum].EmailListID, 'DELETE')
            .then(response => {

                this.getResponseText("Deleted successfully");
            });
       this.popupCancel();
       this.update();
   }
    update() {
        return fetch('http://crmbeta.azurewebsites.net/api/EmailLists')
            .then(response => {
                console.log(response,"sfsdfdssdfsfsdf");
                if(response.ok === true) {
                    return response.json();
                }
            })
            .then(response => {
                    this.setState({
                        maillists: response
                    });
                }
            );
    }

    seeContacts(event) {
        this.setState({checkedMailLists:this.state.maillists[event.target.id].EmailListID});
        return fetch( 'http://crmbeta.azurewebsites.net/api/EmailLists/' + this.state.maillists[event.target.id].EmailListID )
            .then(response=>{
                return response.json();
            }).then(response=>{
                if(response.Contacts.length > 0){
                    this.setState({
                        selectedMailList:response.EmailListID,
                        mailListContacts:response.Contacts
                    });
                }
            }
            );
    }

   getNewContactList(){
        return fetch( 'http://crmbeta.azurewebsites.net/api/EmailLists/' + this.state.selectedMailList)
            .then(response=>{
                return response.json();
            }).then(response=>{
                    if(response.Contacts.length > 0){
                        this.setState({
                            mailListContacts:response.Contacts
                        });
                    }
                }
            );
   }

   getValue(value){
       this.TemplateId=value;
   }

    popupCancel(){
        this.setState({
            sendFunction:false,
            templatePopup:false,
            deletePopUp:false,
            sendPopUp:false,
            deleteFunction:false
        });

    }

    showSendWindow(event){
        this.setState({lineNum:event.target.id});
        this.setState({
            sendFunction:true,
            templatePopup:true,
            deletePopUp:false,
            sendPopUp:true,
            deleteFunction:false
        });
    }
    showDeleteWindow(event){
        this.setState({lineNum:event.target.id});
        this.setState({
            sendFunction:false,
            templatePopup:true,
            sendPopUp:false,
            deletePopUp:true,
            deleteFunction:true,
            responseWindow:(this.state.responseText !== ''),
        });
    }
    getResponseText(response){
        this.setState({
            responseText:response,
            responseWindow:true,
            deleteFunction:false,
            closeAddTo: false,
            addContact:false,
            templatePopup:true,
            upload:false,
            alertWindow:false,
        });
        console.log(this.state);
        setTimeout(() =>{
            this.setState({responseWindow:false,templatePopup:false})
        },1500);
    }

    componentDidMount() {
        this.update();
    }
    render() {
        const headers = <thead>
        <tr id = "ChooseSendRemove">
            <th>Choose a MailList</th>
            <th id = "sendIconBtn">Send Email</th>
            <th id = "btrashIconBtn">Remove a MailList</th>
        </tr>
        </thead>
        const data = this.state.maillists;
        const row = data.map((data, index) =>
            <tr key={index} ref={tRDomElemy => {
                this.tableRows.push(tRDomElemy)
            }}>
                <td  onClick={this.seeContacts} ref="click1" id={index} key={data.EmailListName} >
                    {data.EmailListName}
                </td>
                <td>
                    <i className="glyphicon glyphicon-envelope change" id ={index} onClick={this.showSendWindow} />
                </td>
                <td >
                    <i className="glyphicon glyphicon-trash trash change" id ={index} onClick={this.showDeleteWindow} />
                </td>
            </tr>
        );
        return (

                <div className="scroll">
                    {
                        !this.state.maillists.length &&
                        <Overlay />
                    }
                    <div className="openWindow" style={{display: this.state.templatePopup ? 'flex' : 'none'}}>
                            <div className="formContainer">
                                <div style={{display:this.state.sendPopUp?'block':'none'}}>
                                <div className="uploadContainer">
                                    <TemplateSelect getValue={this.getValue} />
                                    <div className="fileButtons">
                                    <button onClick={this.sendToAll} className="addBtn" id="sendBtn">send</button>
                                    <button onClick={this.popupCancel} className="back addBtn">cancel</button>
                                    </div>
                                    </div>
                                </div>
                                <div style={{display:this.state.deletePopUp?'block':'none'}}>
                                    <AlertWindow windowAction={this.state.sendFunction?this.sendToAll:this.state.deleteFunction?this.deleteMailingList:''}
                                                closePopup={this.popupCancel}
                                    />
                                </div>
                                <div style={{display:this.state.responseWindow  ? 'flex' : 'none' }} className="responseContainer">
                                    <Window responseText={this.state.responseText}/>
                                </div>
                            </div>
                        </div>
                    <table className="mailingListTable" >
                        {headers}
                        <tbody>
                        {row}
                        </tbody>
                    </table>
                <MailingListContacts
                    getResponseText={this.getResponseText}
                    mailListId={this.state.checkedMailLists}
                    data={this.state.mailListContacts}
                    mailListInfo={this.state.mailListHeader}
                    update={this.getNewContactList}
                />
                </div>
        );
}
}
export default MailingLists;
