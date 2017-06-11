import React, {Component} from 'react';
import '../StyleSheet/MailingLists.css';
import call from '../Fetch.js';
import MailingListContacts from './MailingListContacts.js';
import TemplateSelect from '../TableComponent/TemplateSelect.js';
import '../StyleSheet/Table.css';
import AlertWindow from '../AlertWindow';
import Window from '../Window';
import Overlay from '../TableComponent/Overlay.js';


class MailingLists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maillists: [],
            mailListContacts: [],
            mailListHeader: "",
            mailListId: 0,
            checkedMailLists: 0,
            templatePopup: false,
            alertWindow: false,
            sendFunction: false,
            deleteFunction: false,
            lineNum: 0,
            responseWindow: false,
            responseText: '',
            TemplateId: "",
            loading: false
        };
        this.seeContacts = this.seeContacts.bind(this);
        this.deleteMailingList = this.deleteMailingList.bind(this);
        this.update = this.update.bind(this);
        this.getValue = this.getValue.bind(this);
        this.sendToAll = this.sendToAll.bind(this);
        this.popupCancel = this.popupCancel.bind(this);
        this.getNewContactList = this.getNewContactList.bind(this);
        this.showSendWindow = this.showSendWindow.bind(this);
        this.showDeleteWindow = this.showDeleteWindow.bind(this);
        this.getResponseText = this.getResponseText.bind(this);
        this.tableRows = [];
        this.checkedMailLists = "";

    }

    sendToAll() {
        this.setState({loading: true});
        call('http://crmbeta.azurewebsites.net/api/EmailSender/' + this.state.maillists[this.state.lineNum].EmailListID + '/' + this.state.TemplateId, 'POST')
            .then(response => {
                if (response.message.includes('error')) {
                    let error = JSON.parse(response.message);
                    if (error.error === 409) {
                        this.getResponseText(error.message + " Mailing list is empty");
                    }
                }
                else {
                    this.getResponseText("Sent successfully");
                    this.update();
                }
                this.setState({loading:false});
            });


        this.popupCancel();
    }

    deleteMailingList() {
        this.setState({loading: true});
        call('http://crmbeta.azurewebsites.net/api/EmailLists/delete/' + this.state.maillists[this.state.lineNum].EmailListID, 'DELETE')
            .then(() => {
                this.getResponseText("Deleted successfully");
                this.update();
                this.setState({
                    loading: false,
                    mailListContacts: [],
                    checkedMailLists: 0
                });

            });
        this.popupCancel();

    }

    update() {
        this.setState({loading: true});
        fetch('http://crmbeta.azurewebsites.net/api/EmailLists')
            .then(response => {
                if (response.ok === true) {
                    return response.json();
                }
            })
            .then(response => {
                    this.setState({
                        maillists: response,
                        loading: false
                    });
                }
            );
    }

    seeContacts(event) {
        this.setState({
            checkedMailLists: this.state.maillists[event.target.id].EmailListID,
            loading: true
        });
        fetch('http://crmbeta.azurewebsites.net/api/EmailLists/' + this.state.maillists[event.target.id].EmailListID)
            .then(response => {
                return response.json();
            }).then(response => {
                this.setState({loading: false});
                this.setState({
                    selectedMailList: response.EmailListID,
                    mailListContacts: response.Contacts,

                });
                if (response.Contacts.length > 0) {

                }
            }
        );
    }

    getNewContactList() {
        this.setState({loading: true});
        fetch('http://crmbeta.azurewebsites.net/api/EmailLists/' + this.state.selectedMailList)
            .then(response => {
                return response.json();
            }).then(response => {
                this.setState({
                    mailListContacts: response.Contacts,
                    loading: false
                });
            }
        );
    }

    getValue(value) {
        this.setState({TemplateId: value});
    }

    popupCancel() {
        this.setState({
            sendFunction: false,
            templatePopup: false,
            deletePopUp: false,
            sendPopUp: false,
            deleteFunction: false,
        });

    }

    showSendWindow(event) {
        this.setState({lineNum: event.target.id});
        this.setState({
            sendFunction: true,
            templatePopup: true,
            deletePopUp: false,
            sendPopUp: true,
            deleteFunction: false
        });
    }

    showDeleteWindow(event) {
        this.setState({lineNum: event.target.id});
        this.setState({
            sendFunction: false,
            templatePopup: true,
            sendPopUp: false,
            deletePopUp: true,
            deleteFunction: true,

        });
    }

    getResponseText(response) {
        this.setState({
            responseText: response,
            responseWindow: true,
            deleteFunction: false,
            closeAddTo: false,
            addContact: false,
            templatePopup: true,
            upload: false,
            alertWindow: false,
        });
        setTimeout(() => {
            this.setState({responseWindow: false, templatePopup: false})
        }, 1500);
    }

    componentDidMount() {
        this.update();
    }

    render() {
        const headers = <thead>
        <tr id="ChooseSendRemove">
            <th>Choose a MailList</th>
            <th id="sendIconBtn">Send Email</th>
            <th id="trashIconBtn">Remove a MailList</th>
        </tr>
        </thead>;
        const data = this.state.maillists;
        const row = data.map((data, index) =>
            <tr key={index} ref={tRDomElemy => {
                this.tableRows.push(tRDomElemy)
            }}>
                <td onClick={this.seeContacts} ref="list" id={index} key={data.EmailListName}>
                    {data.EmailListName}
                </td>
                <td id={index} onClick={this.showSendWindow}>
                    <i className="glyphicon glyphicon-envelope change" id={index}/>
                </td>
                <td id={index} onClick={this.showDeleteWindow}>
                    <i className="glyphicon glyphicon-trash trash change" id={index}/>
                </td>
            </tr>
        );
        return (
            <div className="scroll">
                {this.state.loading && <Overlay />}
                <div className="openWindow" style={{display: this.state.templatePopup ? 'flex' : 'none'}}>
                    <div className="formContainer">
                        <div style={{display: this.state.sendPopUp ? 'block' : 'none'}}>
                            <div className="uploadContainer">
                                <TemplateSelect getValue={this.getValue}/>
                                <div className="fileButtons">
                                    <button onClick={this.sendToAll}
                                            disabled={this.state.TemplateId > 0 ? '' : 'disabled'} className="addBtn"
                                            id="sendBtn">send
                                    </button>
                                    <button onClick={this.popupCancel} className="back addBtn">cancel</button>
                                </div>
                            </div>
                        </div>
                        <div style={{display: this.state.deletePopUp ? 'block' : 'none'}}>
                            <AlertWindow
                                windowAction={this.state.sendFunction ? this.sendToAll : this.state.deleteFunction ? this.deleteMailingList : ''}
                                closePopup={this.popupCancel}
                            />
                        </div>
                        <div style={{display: this.state.responseWindow ? 'flex' : 'none'}}
                             className="responseContainer">
                            <Window responseText={this.state.responseText}/>
                        </div>
                    </div>
                </div>
                <table className="mailingListTable">
                    {headers}
                    <tbody>
                    {row}
                    </tbody>
                </table>
                <MailingListContacts
                    mailList={this.state.maillists}
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
