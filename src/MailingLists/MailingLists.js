import React, {Component} from 'react';
import '../StyleSheet/MailingLists.css';
import call from '../Fetch.js';
import MailingListContacts from './MailingListContacts.js';

class MailingLists extends Component {
    constructor(props) {
        super(props);
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
    }

     checkMailList(event){
        if(event.target.checked){
            this.checkedMailList.push(event.target);
            this.setState({checkedMailLists:this.state.checkedMailLists + 1});
        }
        else{
            this.setState({checkedMailLists:this.state.checkedMailLists - 1});
        }
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
        call('http://crmbeta.azurewebsites.net/api/EmailLists?id=' + id.EmailListID, 'GET')

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
    render() {
        const headers = <thead>
        <tr>
            <th>Choose a MailList</th>

        </tr>
        </thead>
        const data = this.state.maillists;
        const row = data.map((data, index) =>
            <tr key={index} ref={tRDomElemy => {
                this.tabliToxery.push(tRDomElemy)
            }}>
                 {/*<td><input id={index} type="checkbox" onChange={this.checkMailList.bind(this)}/></td>*/}
                <td  onClick={this.seeContacts}  id={index} key={data.EmailListName}>
                    {data.EmailListName}
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
