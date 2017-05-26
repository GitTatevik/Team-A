import React, { Component } from 'react';
import '../StyleSheet/MailingLists.css';
import { EditAddList } from './EditAddList';


const datab = ["ATAMNABUJNER", "MARKETOLOGNER", "BJISHKNER", "BUSAKERNER", "SIRELI HAYRENAKICNER"]
const Database = { name: "Marketologs", emails: ["eagis92@gmail.com", "easdsgis92@gmail.com", "eauytrfsgis92@gmail.com", "eagssfe@gmail.com", "mkhitaryan@mail.ru", "movsiyan@mail.ru", "petrosyan@mail.ru", "esiminchyan@esiminch.ru"] }

class MailingLists extends Component {
    constructor(props) {
        super(props);
        this.state = { edit: false, addNew: false, };
        this.addEdit = this.addEdit.bind(this);
        this.addNew = this.addNew.bind(this);
        this.closeEmailsDiv=this.closeEmailsDiv.bind(this);

    }

    addEdit() {
        return (
            <div>
                <div>{this.renderExistedList()}</div>
                <div><EditAddList closeMode={this.closeEmailsDiv} editMode={this.state.edit} database={Database} /></div>
            </div>
        )
    }


    closeEmailsDiv(e) {
        e.preventDefault();
        if (this.state.edit) {
            this.setState({ edit: !this.state.edit })
        }
        else {
            this.setState({ addNew: !this.state.addNew })
        }


        console.log(this.state.edit)
    }

    handleEdit() {
        this.setState({ edit: true });
        this.setState({ addNew: false });
    }
    handleNew() {
        this.setState({ addNew: true });
        this.setState({ edit: false });
    }

    addNew() {
        return (
            <div>
                <div>{this.renderExistedList()}</div>
                <h3 className="list_head">Add new Mailing List</h3>
                <div><EditAddList closeMode={this.closeEmailsDiv} database={Database} /></div>
            </div>
        )
    }

    renderTbody() {
        let that = this;
        return (
            datab.map(function (value, key) {
                return (<tr key={key} className="mail_row"><td className=" tabledata mailVal">{value}</td>
                    <td className="tabledata"><button className="listbut btn_table" onClick={that.handleEdit.bind(that)}>EDIT</button></td>
                    <td className="tabledata"><button onClick={that.handleNew.bind(that)} className="listbut btn_table">ADD NEW</button></td></tr>)
            })
        )
    }

    renderExistedList() {
        return (
            <div className="mainCont">
                <table className="mailingListTable">
                    <thead>
                        <tr>
                            <th className="tablehead">NAME</th>
                            <th className="tablehead">EDIT</th>
                            <th className="tablehead">ADD NEW</th>
                        </tr>
                    </thead>
                    <tbody>{this.renderTbody()}</tbody>
                </table>
            </div>
        )
    }

    render() {
        if (this.state.edit) {
            return this.addEdit()
        }
        else if (this.state.addNew) {
            return this.addNew()
        }

        return this.renderExistedList()
    }
}
export default MailingLists;


