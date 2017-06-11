import React, {Component} from 'react';
import TableHeader from'./TableHeader.js';
import TableRow from './TableRow.js';
import '../StyleSheet/Table.css';
import call from '../Fetch.js';
import Edit from './Edit.js';
import AddContact from './AddContact.js';
import UploadFile from './UploadFile.js';
import TemplateSelect from './TemplateSelect.js';
import Overlay from './Overlay.js';
import AddtoExisting from './AddtoExisting.js';
import AlertWindow from '../AlertWindow';
import Window from '../Window'

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            guids: [],
            edit: false,
            editObj: {},
            disabled: true,
            addContact: false,
            checkedBoxArray: [],
            TemplateId: 0,
            sendButton: false,
            mailList: '',
            closeAddTo: false,
            alertWindow:false,
            popup:false,
            sendFunction:false,
            deleteFunction:false,
            responseWindow:false,
            responseText:'',
            loading:false
        };

        this.sendMail = this.sendMail.bind(this);
        this.getGuid = this.getGuid.bind(this);
        this.saveFromEdit = this.saveFromEdit.bind(this);
        this.cancel = this.cancel.bind(this);
        this.onClickEditBtn = this.onClickEditBtn.bind(this);
        this.isDisable = this.isDisable.bind(this);
        this.addContactToTable = this.addContactToTable.bind(this);
        this.closePopUp = this.closePopUp.bind(this);
        this.deleteContact = this.deleteContact.bind(this);
        this.update = this.update.bind(this);
        this.checkBoxChanges = this.checkBoxChanges.bind(this);
        this.createMailList = this.createMailList.bind(this);
        this.mailListName = this.mailListName.bind(this);
        this.backfromUploadFile = this.backfromUploadFile.bind(this);
        this.getSelectValue = this.getSelectValue.bind(this);
        this.addToExisting = this.addToExisting.bind(this);
        this.showSendWindow = this.showSendWindow.bind(this);
        this.showDeleteWindow = this.showDeleteWindow.bind(this);
        this.getResponseText = this.getResponseText.bind(this);
		this.addContact =  this.addContact.bind(this);
    } 

    checkBoxChanges(target) {
        if(target.checked){
            this.setState({checkedBoxArray:[...this.state.checkedBoxArray,target]});
        }
        else{
            let checkedIndex = this.state.checkedBoxArray.indexOf(target);
            this.state.checkedBoxArray.splice(checkedIndex,1);
        }
    }

    isDisable(disabled) {
        this.setState({
            disabled: disabled
        });
    }

    getGuid(guidArray) {
        this.setState({
            guids: guidArray
        });
    }

    sendMail() {
        if (this.state.guids.length !== 0) {
            call('http://crmbeta.azurewebsites.net/api/EmailSender/' + this.state.TemplateId, 'POST', this.state.guids).then(() => {
                this.getResponseText('Email sent');
                this.setState({loading:false});
            });
        }

        this.setState({
            sendButton: false,
            loading:true
        });

        this.setState({
            sendFunction:false,
            deleteFunction:false,
            popup: false,
            upload: false,
            addContactState: false,
            closeAddTo:false,
            alertWindow:false,
        });
    }

    onClickEditBtn(event) {
        this.setState({
            editObj: this.state.data[event.target.id]
        });
        this.setState({
            edit: true
        });
    }

    cancel() {
        this.setState({
            edit: false
        });
    }

    saveFromEdit() {
        this.setState({
            edit: false
        });
    }

    addContactToTable() {
        this.setState({
            addContactState: true
        });
    }

    backfromUploadFile() {
        this.setState({
            upload:false,
            popup:false
        });
    }

    deleteContact() {
        call('http://crmbeta.azurewebsites.net/api/Contacts', 'DELETE', this.state.guids).then(() => {
            this.update();
            this.getResponseText('Deleted Successfully');

            this.setState({
                disabled: true,
                loading:false
            });
        });
         let uncheckedBox = this.state.checkedBoxArray;
		  for (let i = 0; i < this.state.checkedBoxArray.length; ++i) {
            uncheckedBox[i].checked = false;
		  }

        this.setState({
            checkedBoxArray:uncheckedBox,
            sendFunction:false,
            deleteFunction:false,
            popup: false,
            upload: false,
            addContactState: false,
            closeAddTo:false,
            alertWindow:false,
            loading:true
        });
    }

    update() {
        this.setState({loading:true});
        call('http://crmbeta.azurewebsites.net/api/Contacts', 'GET').then(response => {
            this.setState({
                data: response,
                guids: [],
                loading:false
            });
        });
    }

    mailListName() {
        this.setState({mailList: this.refs.createMList.value});
    }

    createMailList() {
        if (this.refs.createMList.value) {
            if (this.state.guids.length > 0) {
                this.setState({loading:true});
                call('http://crmbeta.azurewebsites.net/api/EmailLists', 'POST', {
                    EmailListName: this.refs.createMList.value,
                    Contacts: this.state.guids
                }).then(() => {
                    this.setState({
                        mailList:'',
                        loading:false
                    });
                    this.refs.createMList.value = "";
                    this.getResponseText('Created successfully');
                });
            }
        }
    }

    getSelectValue(value) {
        value = value*1;
        this.setState({TemplateId:value});
        if (value !== 0) {
            this.setState({sendButton: true});
        }
        else {
            this.setState({sendButton: false});
        }
    }

    openUpload() {
        this.setState({
            popup: true,
            upload: true,
            addContactState: false
        })
    }

    addContact() {
        this.setState({
            popup: true,
            upload: false,
            addContactState: true
        });
    }

    closePopUp() {
        this.setState({
            popup:false,
            upload: false,
            addContactState: false,
            closeAddTo:false,
            alertWindow:false,
        });
    }

    addToExisting() {
        this.setState({
            popup:true,
            closeAddTo: true,
            addContactState:false,
            upload:false,
            alertWindow:false,
        });
    }

    showSendWindow(){
        this.setState({
            sendFunction:true,
            closeAddTo: false,
            addContactState:false,
            upload:false,
            popup:true,
            alertWindow:true,
        });
    }
    showDeleteWindow(){
        this.setState({
            deleteFunction:true,
            closeAddTo: false,
            addContactState:false,
            upload:false,
            popup:true,
            alertWindow:true,
        });
    }

    getResponseText(response){
		this.setState({
            responseText:response,
            responseWindow:true,
            deleteFunction:false,
            closeAddTo: false,
            addContactState:false,
            upload:false,
            popup:true,
            alertWindow:false,
        });
            setTimeout(() =>{
                this.setState({responseWindow:false,popup:false})
            },2000)
    }

    componentDidMount() {
        this.setState({loading:true});
        call('http://crmbeta.azurewebsites.net/api/Contacts', 'GET').then(response => {
            this.setState({
                data: response,
                loading:false
            });
        });
    }

    render() {
        if (this.state.edit) {
            return (
                <div className="UserTable">
                    <div id="scroll">
                        <Edit data={this.state.editObj} save={this.saveFromEdit} cancel={this.cancel}
                              update={this.update}/>
                    </div>
                </div>
            );
        }
        return (
            <div className="UserTable">
                {this.state.loading && <Overlay />}
                <div className="openWindow" style={{display: this.state.popup ? 'flex' : 'none'}}>
                    <div className="formContainer">
                        <div className="AddRow" style={{display: this.state.addContactState ? 'flex' : 'none'}}>
                            <AddContact  update={this.update} closePopup={this.closePopUp} getResponseText={this.getResponseText}/>
                        </div>
                        <div style={{display: this.state.upload ? 'flex' : 'none'}}>
                            <UploadFile cancelUpload={this.cancelUpload} update={this.update}  closePopup={this.closePopUp} getResponseText={this.getResponseText}/>
                        </div>
                        <div style={{display: this.state.closeAddTo ? 'flex' : 'none'}}>
                            <AddtoExisting selectedContacts={this.state.guids} closePopup={this.closePopUp} getResponseText={this.getResponseText}/>
                        </div>
                        <div style={{display:this.state.alertWindow ? 'flex' : 'none' }}>
                            <AlertWindow windowAction={this.state.deleteFunction ? this.deleteContact : (this.state.sendFunction)?this.sendMail:''}
                                         closePopup={this.closePopUp} />
                        </div>
                        <div style={{display:this.state.responseWindow  ? 'flex' : 'none' }} className="responseContainer">
                           <Window responseText={this.state.responseText}/>
                        </div>
                    </div>
                </div>
                <div id='scroll'>
                    <table className="table">
                        <TableHeader headerdata={this.state.data[0]} className="tableheader"
                                     checkedChange={this.checkedChange} checked={this.state.allchecked}/>
                        <TableRow isdisabledprop={this.isDisable} dataArray={this.state.data} guids={this.state.guids}
                                  editBtn={this.onClickEditBtn} checkBoxChanges={this.checkBoxChanges}/>
                    </table>
                </div>
                <div className="btnBox">
                    <div id="templateSelectBox">
                        <TemplateSelect disabled={this.state.disabled} defaultValue={this.state.templateDefaultValue} getValue={this.getSelectValue} />
                        <button disabled={(this.state.sendButton && (this.state.checkedBoxArray.length > 0))? '' : 'disabled'} className="tableButtons"
                                onClick={this.showSendWindow}>
                            <i className="glyphicon glyphicon-envelope"/><br />Send Email
                        </button>
                    </div>
                    <button disabled={this.state.disabled} className="tableButtons" onClick={this.addToExisting}>
                        <i className="glyphicon glyphicon-folder-open"/><br /> Add to Mailing list
                    </button>
                    <button disabled={this.state.disabled} className="deleteBtn tableButtons" onClick={this.showDeleteWindow}>
                        <i className="glyphicon glyphicon-trash"/><br />Delete Selected
                    </button>

                    <button onClick={this.addContact} className="tableButtons">
                        <i className="glyphicon glyphicon-user"/><br />Add Contact
                    </button>

                    <div className="maillist">
                        <input type="text" ref="createMList" className="inputMail" placeholder="Add a Mailing List Name"
                               onChange={this.mailListName}/>
                    </div>

                    <button onClick={this.createMailList}
                            disabled={((this.state.checkedBoxArray.length > 0) && (this.state.mailList.length > 0))?'':'disabled'}
                            className="tableButtons"><i className="glyphicon glyphicon-list-alt" /><br />Create Mailing list
                    </button>

                    <button className="tableButtons" onClick={this.openUpload.bind(this)}>
                        <i className="glyphicon glyphicon-upload"/><br />Upload
                    </button>
                </div>
            </div>
        );
    }

}
export default Table;
