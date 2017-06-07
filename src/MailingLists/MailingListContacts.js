import React, {Component} from 'react';
import '../StyleSheet/MailingLists.css';
import TemplateSelect from '../TableComponent/TemplateSelect.js';
import call from '../Fetch.js';

export default class MailingListContacts extends Component{
    constructor(props){
        super(props);
        this.state = {
            disabledValue:0,
            mailListId:0
        };

        this.selectedBoxes=[];
        this.selectedContacts= [];
        this.selectCheck = this.selectCheck.bind(this);
        this.sendEmails =  this.sendEmails.bind(this);
        this.deleteEmails =  this.deleteEmails.bind(this);
        this.getValue = this.getValue.bind(this);
        this.templId = 0;
    }

    getValue(templateId){
        this.templId = templateId;

    }
    selectCheck(event){
        if(event.target.checked === true) {
            this.selectedContacts.push(event.target.id);
            this.selectedBoxes.push(event.target);
        }
        else{
            let index = this.selectedContacts.indexOf(event.target.id);
            if(index !== -1) {
                this.selectedContacts.splice(index,1);
                this.selectedBoxes.splice(index,1);
            }
        }
        console.log(this.selectedContacts);
    }
    sendEmails() {

       /*call('http://crmbeta.azurewebsites.net/api/EmailSender/' +  this.templId, {
            method:'POST',
            body: this.selectedContacts
        }).then(response=>{



        })*/
        let self = this;
        call('http://crmbeta.azurewebsites.net/api/EmailSender/' + self.templId, 'POST', self.selectedContacts).then(function (response) {
            //console.log("status", this.state.TemplateId, response);
            alert("Email sent");

        });
        this.emptyCheckedList();
    }



    deleteEmails(){
        return fetch('http://crmbeta.azurewebsites.net/api/EmailLists/remove/' + this.state.mailListId,{
            method: 'PUT',
        headers: {'Accept': 'application/json','Content-Type': 'application/json'},
            body: JSON.stringify(this.selectedContacts)
        }).then(response=>{

            if(response.ok === true){
                this.props.updateContent();
                alert("Contact deleted");
            }
            else{
                alert("Sending failure :" + response.statusText);
            }
        })
    }
    emptyCheckedList(){
        this.selectedBoxes.forEach(box=>{box.checked=false});
        this.selectedContacts=[];
        this.selectedBoxes=[];
    }
    componentWillReceiveProps(nextProps){
        this.setState({disabledValue:nextProps.checkedMailLists,mailListId:nextProps.mailListId});
    }
    render(){
     console.log("render");
        this.emptyCheckedList();
        return(
            <div className="mailListContainer">
                <h2 className="h2">Name of mailing list - {this.props.mailListInfo}</h2>
                <table className="mailingListContactsTable" id="scroll" >
                    <thead >
                    <tr >
                        <th>Select</th>
                        <th>Full Name</th>
                        <th>Company Name</th>
                        <th>Country</th>
                        <th>Position</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.data.map((value,index)=>{
                        return(
                            <tr key={index} >
                                <td><input
                                    onClick={this.selectCheck}
                                    id={value.Guid}
                                    type="checkbox"
                                /></td>
                                <td>{value["Full Name"]}</td>
                                <td>{value["Company Name"]}</td>
                                <td>{value.Position}</td>
                                <td>{value.Country}</td>
                                <td>{value.Email}</td>
                            </tr>

                        );
                    })}

                    </tbody>
                </table>
                <div className="btnContainer">
                    <button onClick={this.deleteEmails} disabled={(this.props.data.length > 0)?'':'disabled'}
                            className="mailBtn dltMailBtn">Delete checks</button>
                </div>
            </div>
        );
    }
}


