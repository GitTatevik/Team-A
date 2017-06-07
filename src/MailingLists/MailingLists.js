import React, {Component} from 'react';
import '../StyleSheet/MailingLists.css';
import call from '../Fetch.js';
import MailingListContacts from './MailingListContacts.js';
import TemplateSelect from '../TableComponent/TemplateSelect.js';
import '../StyleSheet/Table.css';

class MailingLists extends Component {
    constructor(props) {
        super(props);
        this.TemplateId="";
        this.lineNum ="";
        this.checkedMailLists="";
        this.state = {
            maillists: [],
            mailListContacts: [],
            mailListHeader: "",
            mailListId:0,
            checkedMailLists:0,
            templatePopup:false


        }
        this.seeContacts = this.seeContacts.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.tabliToxery = [];
         this.checkedMailList = [];
         this.getValue= this.getValue.bind(this);
         this.sendToAll =this.sendToAll.bind(this);
         this.popupCancel = this.popupCancel.bind(this);
         this.popupOpen =  this.popupOpen.bind(this);
    }


    popupOpen(event){
        this.setState({templatePopup:true});
        this.lineNum =event.target.id;
        console.log("ROWINDEX", this.lineNum);
    }
    sendToAll(){
        let self = this;
        self.popupCancel();
        console.log(this.TemplateId);
        console.log( "maillist",this.state. maillists[this.lineNum].EmailListID);
        call('http://crmbeta.azurewebsites.net/api/EmailSender/'+  self.state. maillists[this.lineNum].EmailListID +"/"+ self.TemplateId,  'POST')
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
        // let id = this.state.maillists[event.target.id];
        // call('http://crmbeta.azurewebsites.net/api/EmailLists/' + id.EmailListID, 'GET')
        //
        //     .then(list=>{
        //         this.setState({
        //             mailListId:id.EmailListID,
        //             mailListContacts: list.Contacts,
        //             mailListHeader: id.EmailListName
        //         })
        //     })
        console.log(this.state.maillists[event.target.id].EmailListID);
        let self =this;
        return fetch( 'http://crmbeta.azurewebsites.net/api/EmailLists/'+self.state.maillists[event.target.id].EmailListID )
            .then(response=>{

                return response.json();
            }).then(response=>{

                if(response)
                    console.log("ok",response.Contacts);
                    self.setState({
                        mailListContacts:response.Contacts

                })
                    //console.log("contact data",response);
            }

            )
    }
    componentDidMount() {
            this.update();
    }
    getValue(value){
        console.log("value",value);
       this.TemplateId=value;
    }
    popupCancel(){
        this.setState({templatePopup:false})
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

                <td>
                    <i className="glyphicon glyphicon-send" id ={index} onClick={this.popupOpen} />
                </td>
                <td >
                    <i className="glyphicon glyphicon-trash trash" id ={index} onClick={this.delete} />
                </td>

            </tr>
        );
        return (
                <div className="scroll">


                        <div style={{display: this.state.templatePopup ? 'flex' : 'none'}}>
                            <div className="formContainer">
                                <span>Choose a Template</span>
                            <TemplateSelect getValue={this.getValue} />
                                <button onClick={this.sendToAll}>send</button>
                                <button onClick={this.popupCancel}>cancel</button>
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
                    updateContent = {this.seeContacts}
                    mailListId={this.state.checkedMailLists}
                    data={this.state.mailListContacts}
                    mailListInfo={this.state.mailListHeader}
                />
                </div>

        );

    }
}
export default MailingLists;
