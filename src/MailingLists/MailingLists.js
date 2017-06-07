import React, {Component} from 'react';
import '../StyleSheet/MailingLists.css';
import call from '../Fetch.js';
import MailingListContacts from './MailingListContacts.js';
import TemplateSelect from '../TableComponent/TemplateSelect.js';

class MailingLists extends Component {
    constructor(props) {
        super(props);
        this.TemplateId="";
        this.state = {
            maillists: [],
            mailListContacts: [],
            mailListHeader: "",
            mailListId:0,
            checkedMailLists:0


        }
        this.seeContacts = this.seeContacts.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.tabliToxery = [];
         this.checkedMailList = [];
         this.getValue= this.getValue.bind(this);
         this.sendToAll =this.sendToAll.bind(this);
    }


    sendToAll(event){
        let self = this;
        console.log(this.TemplateId);
        console.log( "maillist",this.state. maillists[event.target.id].EmailListID);
        call('http://crmbeta.azurewebsites.net/api/EmailSender/'+  self.state. maillists[event.target.id].EmailListID +"/"+ self.TemplateId,  'POST')
            .then(function () {
            self.update();
        })
    }



    delete(event) {
       // console.log("maillist",this.state.maillists[event.target.id]);
        let self = this;
        call('http://crmbeta.azurewebsites.net/api/EmailLists/delete/'+ this.state.maillists[event.target.id].EmailListID  , 'DELETE').then(function () {
            self.update();
        })
    }

    update() {

        let self = this;
        call('http://crmbeta.azurewebsites.net/api/EmailLists', 'GET').then(function (list) {

            console.log("maillists", list);
            self.setState({
                maillists: list
            });
        })
    }

    seeContacts(event) {
        let id = this.state.maillists[event.target.id];
        call('http://crmbeta.azurewebsites.net/api/EmailLists/' + id.EmailListID, 'GET')

            .then(list=>{
                this.setState({
                    mailListId:id.EmailListID,
                    mailListContacts: list.Contacts,
                    mailListHeader: id.EmailListName
                })
            })
    }
    componentDidMount() {
            this.update();
    }
    getValue(value){
        console.log("value",value);
       this.TemplateId=value;
    }
    render() {
        const headers = <thead>
        <tr  >
            <th>Choose a MailList</th>

        </tr>
        </thead>
        const data = this.state.maillists;
        const row = data.map((data, index) =>
            <tr key={index} ref={tRDomElemy => {  // recycle bin icon
                this.tabliToxery.push(tRDomElemy)
            }}>
                 {/*<td><input id={index} type="checkbox" onChange={this.checkMailList.bind(this)}/></td>*/}
                <td  onClick={this.seeContacts}  id={index} key={data.EmailListName} >
                    {data.EmailListName}
                </td>
				 <td >
                    <TemplateSelect getValue={this.getValue}  disabled={this.state.disabled} />
                </td>
                <td>
                    <i className="glyphicon glyphicon-send" id ={index} onClick={this.sendToAll} />
                </td>
                <td >
                    <i className="glyphicon glyphicon-trash trash" id ={index} onClick={this.delete} />
                </td>

            </tr>
        );
        return (
                <div className="scroll">

                    <table className="mailingListTable" >
                        {headers}
                        <tbody>
                        {row}
                        </tbody>
                    </table>
                <MailingListContacts
                 //checkedMailList = {this.state.checkedMailLists}
                    updateContent = {this.seeContacts}
                    mailListId={this.state.mailListId}
                    data={this.state.mailListContacts}
                    mailListInfo={this.state.mailListHeader}
                />
                </div>

        );

    }
}
export default MailingLists;
