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
            creatListBtndisabled: true,
            uploadFile: false,
            TemplateId: "",
            sendButton: false,
            mailList: '',
            closeAddTo: false
        };
        this.sendMail = this.sendMail.bind(this);
        this.getGuid = this.getGuid.bind(this);
        this.saveFromEdit = this.saveFromEdit.bind(this);
        this.cancel = this.cancel.bind(this);
        this.onClickEditBtn = this.onClickEditBtn.bind(this);
        this.isDisable = this.isDisable.bind(this);
        this.addContact = this.addContact.bind(this);
        this.back = this.back.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.checkBoxChanges = this.checkBoxChanges.bind(this);
        this.createMailList = this.createMailList.bind(this);
        this.mailListName = this.mailListName.bind(this);
        this.backfromUploadFile = this.backfromUploadFile.bind(this);
        this.getSeletValue = this.getSeletValue.bind(this);
        this.cancelUpload = this.cancelUpload.bind(this);
        this.closeAddTo = this.closeAddTo.bind(this);
        this.addToExisting = this.addToExisting.bind(this);

    }

    checkBoxChanges(target) {
        this.state.checkedBoxArray.push(target);
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

    componentDidMount() {
        call('http://crmbeta.azurewebsites.net/api/Contacts', 'GET').then(response => {
            this.setState({
                data: response
            });
            console.log("GET Data", response);
        });
    }

    sendMail() {
        if (this.state.guids.length !== 0) {
            call('http://crmbeta.azurewebsites.net/api/EmailSender/' + this.state.TemplateId, 'POST', this.state.guids).then(function (response) {
                //console.log("status", this.state.TemplateId, response);
                alert("Email sent");
            });
        }

        this.setState({
            sendButton: true,
            disabled: true,
            guids: []
        });
        for (let i = 0; i < this.state.checkedBoxArray.length; ++i) {
            this.state.checkedBoxArray[i].checked = false;
        }

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

    addContact() {
        this.setState({
            addContact: true
        });
    }

    uploadFile() {
        this.setState({
            uploadFile: true
        });
    }

    backfromUploadFile() {
        this.setState({
            uploadFile: false
        });
    }


    delete() {
        let self = this;
        call('http://crmbeta.azurewebsites.net/api/Contacts', 'DELETE', this.state.guids).then(function (data) {
            self.update();
            //alert("detele");
            self.setState({
                disabled: true
            });
        });
        for (let i = 0; i < this.state.checkedBoxArray.length; ++i) {
            this.state.checkedBoxArray[i].checked = false;
        }

    }

    update() {
        call('http://crmbeta.azurewebsites.net/api/Contacts', 'GET').then(response => {
            this.setState({
                data: response,
                guids: []
            });
        });
    }

    mailListName() {
        this.setState({mailList: this.refs.createMList.value});
    }

    createMailList() {
        let self = this;
        if (this.refs.createMList.value) {
            if (this.state.guids.length > 0) {
                call('http://crmbeta.azurewebsites.net/api/EmailLists', 'POST', {
                    EmailListName: this.refs.createMList.value,
                    Contacts: this.state.guids
                }).then(function () {

                    self.setState({
                        creatListBtndisabled: true,
                        disabled: true,
                        guids: []
                    })

                    self.refs.createMList.value = "";

                    for (let i = 0; i < self.state.checkedBoxArray.length; ++i) {
                        self.state.checkedBoxArray[i].checked = false;
                    }
                })
                console.log("create New Mail List");

            } else {
                alert("Did not Choose Contact");
            }
        } else {
            alert("Mail List Name No valid");
        }
    }

    getSeletValue(value) {
        this.state.TemplateId = value;
        if (value !== '') {
            this.setState({sendButton: true});
        }
        else {
            this.setState({sendButton: false});
        }
        //console.log("In State Id",this.state.TemplateId);
    }

    openUpload() {
        this.setState({
            popup: true,
            upload: true,
            addContact: false
        })
    }

    cancelUpload() {
        this.setState({
            popup: false,
            addContact: false
        })
    }

    addContact() {
        this.setState({
            popup: true,
            upload: false,
            addContact: true
        });

    }

    back() {
        this.setState({
            popup: false,
            upload: false,
            addContact: false
        });
    }

    closeAddTo() {
        this.setState({closeAddTo: false});

    }

    addToExisting() {

        this.setState({closeAddTo: true});
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
                <div className="openWindow" style={{display: this.state.popup ? 'flex' : 'none'}}>
                    <div className="formContainer">
                        <div style={{display: this.state.addContact ? 'flex' : 'none'}}>
                            <AddContact className="openWindow" back={this.back} update={this.update}/>
                        </div>
                        <div style={{display: this.state.upload ? 'flex' : 'none'}}>
                            <UploadFile cancelUpload={this.cancelUpload} update={this.update} className="openWindow"/>
                        </div>
                        <div style={{display: this.state.closeAddTo ? 'flex' : 'none'}}>
                            <AddtoExisting selectedContacts={this.state.guids} closePopup={this.closeAddTo}
                                           className="openWindow"/>
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
                {/*Buttons for Table Box*/}
                <div className="btnBox">
                    <div id="templateSelectBox">
                        <span>Template&nbsp;</span>
                        <TemplateSelect disabled={this.state.disabled} getValue={this.getSeletValue}/>
                        <button disabled={this.state.sendButton ? '' : 'disabled'} className="tableButtons"
                                onClick={this.sendMail}>
                            <i className="glyphicon glyphicon-envelope"/><br />Send Email
                        </button>
                    </div>
                    <button disabled={this.state.disabled} className="tableButtons" onClick={this.addToExisting}>
                        <i className="glyphicon glyphicon-folder-open"/><br /> Add to Mailist
                    </button>
                    <button disabled={this.state.disabled} className="deleteBtn tableButtons" onClick={this.delete}>
                        <i className="glyphicon glyphicon-trash"/><br />Delete Selected
                    </button>

                    <button onClick={this.addContact} className="tableButtons">
                        <i className="glyphicon glyphicon-user"/><br />Add Contact
                    </button>

                    <div className="maillist">
                        <input type="text" ref="createMList" className="inputMail" placeholder="Mail List Name"
                               onChange={this.mailListName}/>
                    </div>

                    <button onClick={this.createMailList}
                            disabled={(!this.state.disabled && this.state.mailList.length > 0) ? false : true}
                            className="tableButtons"><i className="glyphicon glyphicon-list-alt"/><br />Create New List
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
