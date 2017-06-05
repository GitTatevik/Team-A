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
            mailList:''
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
       this.setState({mailList:this.refs.creatMList.value});
    }

    createMailList() {
        let self = this;
        if (this.refs.creatMList.value) {
            if (this.state.guids.length > 0) {
                call('http://crmbeta.azurewebsites.net/api/EmailLists', 'POST', {
                    EmailListName: this.refs.creatMList.value,
                    Contacts: this.state.guids
                }).then(function () {
                    self.setState({
                        creatListBtndisabled: true,
                        disabled: true,
                        guids: []
                    });
                    self.refs.creatMList.value = "";

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
            this.setState({ sendButton: true });
        }
        else {
            this.setState({ sendButton: false });
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

    render() {
        //console.log("this.state.guids",this.state.guids);
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
                            <UploadFile cancelUpload={this.cancelUpload} className="openWindow"/>
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
                        <span>Template&nbsp;&nbsp;</span>
                         <TemplateSelect disabled={this.state.disabled} getValue={this.getSeletValue} />
                        <button disabled={this.state.sendButton ? '' : 'disabled'} onClick={this.sendMail}
                            className="tableButtons">Send Email</button>
                    </div>
                    <button disabled={this.state.disabled} className="deleteBtn tableButtons" onClick={this.delete}>
                        Delete Selected</button>
                    <button onClick={this.addContact} className="tableButtons">Add Contact</button>
                    <div className="maillist">
                    <input type="text" ref="creatMList" className="inputMail" placeholder="Mail List Name" onChange={this.mailListName}/>
                    </div>
                        <button onClick={this.createMailList} disabled={(!this.state.disabled && this.state.mailList.length > 0)?false:true} className="tableButtons">Create New List</button>
                    <button className="tableButtons" onClick={this.openUpload.bind(this)}>Upload</button>
                </div>
            </div>


        );
    }

}
export default Table;
