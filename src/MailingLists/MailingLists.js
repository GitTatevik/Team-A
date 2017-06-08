import React, {Component} from 'react';
import '../StyleSheet/MailingLists.css';
import call from '../Fetch.js';
import MailingListContacts from './MailingListContacts.js';
import TemplateSelect from '../TableComponent/TemplateSelect.js';
import '../StyleSheet/Table.css';
import Overlay from "../TableComponent/Overlay";

class MailingLists extends Component {
    constructor(props) {
        super(props);

        this.state = {
            maillists: [],
            mailListContacts: [],//all contacts
            mailListHeader: "",
            mailListId:0,
            checkedMailLists:0,
            templatePopup:false,

        };
         this.seeContacts = this.seeContacts.bind(this);
         this.delete = this.delete.bind(this);
         this.update = this.update.bind(this);
         this.tabliToxery = [];
         this.getValue= this.getValue.bind(this);
         this.sendToAll =this.sendToAll.bind(this);
         this.popupCancel = this.popupCancel.bind(this);
         this.popupOpen =  this.popupOpen.bind(this);
         this.getNewContactList = this.getNewContactList.bind(this);
        this.TemplateId="";
        this.lineNum ="";
        this.checkedMailLists="";
    }


    popupOpen(event){
        this.setState({templatePopup:true});
        this.lineNum =event.target.id;
    }
    sendToAll(){
        this.popupCancel();
        call('http://crmbeta.azurewebsites.net/api/EmailSender/'+  this.state. maillists[this.lineNum].EmailListID +"/"+ this.TemplateId,  'POST')
            .then(() => {
                this.update();
           })
    }


    delete(event) {
        call('http://crmbeta.azurewebsites.net/api/EmailLists/deleteContact/'+ this.state.maillists[event.target.id].EmailListID  , 'DELETE').then(() => {
            this.update();
        })
    }

    update() {
        call('http://crmbeta.azurewebsites.net/api/EmailLists', 'GET').then(list => {
            this.setState({
                maillists: list
            });
        });
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
        console.log("value",value);
       this.TemplateId=value;
    }
    popupCancel(){
        this.setState({templatePopup:false})
    }
    componentDidMount() {
        this.update();
    }
    render() {
        const headers = <thead>
        <tr  >
            <th>Choose a MailList</th>
			<th>Send Email</th>
			<th>Remove a MailList</th>
        </tr>
        </thead>
        const data = this.state.maillists;
        const row = data.map((data, index) =>
            <tr key={index} ref={tRDomElemy => {  // recycle bin icon
                this.tabliToxery.push(tRDomElemy)
            }}>
                 {/*<td><input id={index} type="checkbox" onChange={this.checkMailList.bind(this)}/></td>*/}
                <td  onClick={this.seeContacts} ref="click1" id={index} key={data.EmailListName} >
                    {data.EmailListName}
                </td>

                <td>
                    <i className="glyphicon glyphicon-envelope change" id ={index} onClick={this.popupOpen} />
                </td>
                <td >
                    <i className="glyphicon glyphicon-trash trash change" id ={index} onClick={this.delete} />
                </td>

            </tr>
        );
        return (

                <div className="scroll">
                    {
                        ((!this.state.maillists.length) ) && <Overlay />
                    }
                    <div className="openWindow" style={{display: this.state.templatePopup ? 'flex' : 'none'}}>
                            <div className="formContainer">
                                <div className="uploadContainer">
                            <TemplateSelect getValue={this.getValue} />
                                <span>Choose a Template</span>
                                <div className="fileButtons">
                                <button onClick={this.sendToAll} className="addBtn" id="sendBtn">send</button>
                                <button onClick={this.popupCancel} className="back addBtn">cancel</button>
                                </div>
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
                 //checkedMailList = {this.state.checkedMailLists}
                    updateContent = {this.getNewContactList}
                    mailListId={this.state.checkedMailLists}
                    data={this.state.mailListContacts}
                    mailListInfo={this.state.mailListHeader}
                />
                </div>
        );

    }
}
export default MailingLists;
