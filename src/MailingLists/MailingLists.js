import React, {Component} from 'react';
import '../StyleSheet/MailingLists.css';
import call from '../Fetch.js';
import MailListContacts from './MailListContacts.js';

class MailingLists extends Component {
	constructor(props) {
		super(props);
		this.state = {
			maillists: [],
			mailListContacts: [],
			mailListHeader: "",
			checkedBoxArray: [],
			selectedMailListId: []
		}
		this.seeContacts = this.seeContacts.bind(this);
		this.checkBoxOnChange = this.checkBoxOnChange.bind(this);
		this.delete = this.delete.bind(this);
		this.update = this.update.bind(this);
	}

	componentDidMount() {
		let self = this;
		call('http://crmbeta.azurewebsites.net/api/EmailLists', 'GET').then(function(list) {
			 console.log("maillists",list);
			self.setState({
				maillists: list
			});
		})
	}
	delete() {

		let self = this;
		call('http://crmbeta.azurewebsites.net/api/EmailLists'+this.state.selectedMailListId, 'DELETE').then(function() {
			self.update();
			alert("Delete Mail Lists")
			self.setState({
				selectedMailListId: []
			});
		})
		for (let i = 0; i < this.state.checkedBoxArray.length; ++i) {
			this.state.checkedBoxArray[i].checked = false;
		}
	}
	update() {
		let self = this;
		call('http://crmbeta.azurewebsites.net/api/EmailLists', 'GET').then(function(list) {
			console.log("maillists", list);
			self.setState({
				maillists: list
			});
		})
	}
	seeContacts(event) {
		console.log(event.target.id);
		let datalist = this.state.maillists[event.target.id].Contacts;
		this.setState({
			mailListContacts: datalist,
			mailListHeader: this.state.maillists[event.target.id].EmailListName
		})
	}
	checkBoxOnChange(event) {
		// console.log(event.target.id);
		this.state.checkedBoxArray.push(event.target);
		let index = event.target.id;
		if (event.target.checked === true) {
			this.state.selectedMailListId.push(this.state.maillists[index].EmailListID);

		} else {
			for (let i = 0; i < this.state.selectedMailListId.length; ++i) {

				if (this.state.maillists[index].EmailListID === this.state.selectedMailListId[i]) {
					this.state.selectedMailListId.splice(i, 1);

				}

			}
		}
		console.log("MailListId Array",this.state.selectedMailListId);
	}


    render() {
        const headers = <thead>
                           <tr>
                                {/*<th>Choose</th>*/}
                                <th>Name</th>
                                <th>Contacts </th>
                                <th>Action</th>
                            </tr>
                       </thead>
         const data=this.state.maillists
		      const row = data.map((data,index)=>
		     	<tr key={index} ref={index}>
                     {/*<td key={index} id="checkbox">
						 <input type="checkbox" ref={index} id={index} onChange={this.checkBoxOnChange} />
					 </td>*/}
			     	 <td key={data.EmailListName}>
				     	{data.EmailListName}
                     </td>
					  <td key={data.Contacts.length}>
				     	{data.Contacts.length}
                     </td>
			     	<td ><button  id={index} onClick={this.seeContacts}>See Contacts</button></td>
		     	</tr>
		     	);
		     	return(
                     <div>
                        <div className ="Block">
                            <table>
                                {headers}
                                <tbody>
                                    {row}
                                </tbody>
                            </table>
                             {/*<button  id="deleteBtn" disabled={this.state.disabled} className="deleteBtn" onClick={this.delete}>Delete Selected</button>*/}
                        </div>
                        <div className="Block">
                          <MailListContacts data={this.state.mailListContacts} header={this.state.mailListHeader} />
                        </div>
                     </div>

		     	);

    }
}
export default MailingLists;
