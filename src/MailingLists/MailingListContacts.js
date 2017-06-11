import React, {Component} from 'react';
import '../StyleSheet/MailingLists.css';
import call from '../Fetch.js';
import Overlay from '../TableComponent/Overlay.js';

export default class MailingListContacts extends Component{
    constructor(props){
        super(props);
        this.state = {
            disabledValue:0,
            mailListId:0,
            emailListName:'',
            contactData:[],
            loading:false
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
    }

    sendEmails() {
        this.setState({loading:true});
      call('http://crmbeta.azurewebsites.net/api/EmailSender/' + this.templId, 'POST', this.selectedContacts).then(() => {
            this.props.getResponseText('Email sent');
        });
        this.emptyCheckedList();
        this.setState({loading:false});
         }

    deleteEmails(){
        if(this.selectedBoxes.length) {
            this.setState({loading:true});
            fetch('http://crmbeta.azurewebsites.net/api/EmailLists/remove/' + this.state.mailListId, {
                method: 'PUT',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify(this.selectedContacts)
            }).then(response => {
                if (response.ok === true) {
                    this.props.update();
                    this.props.getResponseText('Contact deleted');

                }
                else {
                    this.props.update();
                    this.props.getResponseText('Sending failure :' + response.statusText);
                }
                this.props.update();
                this.setState({loading:false});
            });
        }
        else{
            this.props.getResponseText('No selected contacts');
        }
    }
    emptyCheckedList(){
        this.selectedBoxes.forEach(box=>{box.checked=false});
        this.selectedContacts=[];
        this.selectedBoxes=[];
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            disabledValue:nextProps.checkedMailLists,
            mailListId:nextProps.mailListId,
            emailListName:nextProps.data.length?nextProps.data[0].EmailLists[0]:'',
            contactData:nextProps.data

        });
    }
    render(){
        this.emptyCheckedList();
        return(
            <div className="mailListContainer">
                {this.state.loading && <Overlay />}
                <h2 className="h2" style={{opacity:this.props.mailList.length?'1':'0'}}>  &nbsp; {this.state.emailListName}</h2>
                <table className="mailingListContactsTable" id="scroll" >
                    <thead >
                    <tr >
                        <th>Select</th>
                        <th>Full Name</th>
                        <th>Company Name</th>
                        <th>Position</th>
                        <th>Country</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>

                    { (this.props.mailList.length > 0) && this.props.data.map((value,index)=>{
                        return(
                            <tr key={index}>
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
                    <button
                        onClick={this.deleteEmails}
                        disabled={(this.state.contactData.length && this.props.mailList.length)?'':'disabled'}
                        className="mailBtn dltMailBtn">Delete contacts</button>
                    <div className="confirmationContainer" style={{display:this.state.confirmWindow ? 'flex' : 'none'}}>
                    </div>
                </div>
            </div>
        );
    }
}


