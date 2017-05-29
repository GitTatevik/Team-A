import React, { Component } from 'react';
import TableHeader from'./TableHeader.js';
import TableRow from './TableRow.js';
import AddRowTable from './AddRowTable.js';
import call from '../Fetch.js';
import '../StyleSheet/Table.css';
import Overlay from './Overlay.js';



//	import array from '../array.js';

class Table extends Component{
			constructor(props){
				super(props);
				this.state={
				data:[],
				isCheckedMails:false,
				overlay:false
				};
				this.updateTable=this.updateTable.bind(this);
				this.sentDataBtn = this.sentDataBtn.bind(this);
				this.selectedMailsAddDelete = this.selectedMailsAddDelete.bind(this);
				this.selectedMails=[];
				this.selectAll = this.selectAll.bind(this); 
				this.createEmailList = this.createEmailList.bind(this);
				this.DeleteSelected = this.DeleteSelected.bind(this);
				this.AddContact =  this.AddContact.bind(this);
				this.UploadFileToContacts = this.UploadFileToContacts.bind(this);
 			}
			
			
			selectedMailsAddDelete(id,isChecked){ // is checked-ov imanalu enq check exel e te che,checkboxy
			if(isChecked===true){
				if(this.selectedMails.length == 0){
					this.setState({isCheckedMails:true});	
				}
			this.selectedMails.push(this.state.data[id].guid);
			}
			else{
				let idChecking = this.selectedMails.indexOf(this.state.data[id].guid);
				if(idChecking !== -1){ 
				this.selectedMails.splice(idChecking,1);
				if(this.selectedMails.length == 0){
					this.setState({isCheckedMails:false}); // erb vor lriv datarkvum e array-y nor verjum anum enq
				}
				}
				
			}
			
			}
			// Updates after demo day
			createEmailList(){
				this.setState({overlay:true});
			}
			DeleteSelected(){
				this.setState({overlay:true});
			}
			AddContact(){
				this.setState({overlay:true});
			}
			UploadFileToContacts(){
				this.setState({overlay:true});
			}
			
			
			selectAll(selectedChecks){
				for(let i of this.tablerow.checkboxes){
					console.log(i);
					i.checked = selectedChecks;
				
					this.selectedMailsAddDelete(i.id, i.checked);  // null e uxarkum, inchu?
				}	
			}
			
			updateTable(){
		      this.setState({data:[]});
		      //console.log("update table, and Data",array);
			}
			
			componentDidMount(){
				//console.log("componentDidMount");
				call('api/contacts','GET').then((response)=>{
				if(response.error){
				alert(response.message)
				}
				else{
					console.log(response);
				this.setState({data:response});
				}
				});
			}
			sentDataBtn(){
				this.setState({overlay:true});
				call('api/EmailSender?TemplateId=1','POST', this.selectedMails).then(function(response){
				if(response.error){
			
				alert(response.message); 
				}
				else{
				
				alert("Message sent!");
				}
				});
			
			this.selectedMails=[];
			this.setState({isCheckedMails:false}) // disabled enq sarqum
			this.tablerow.deleteChecks();
		 }
			
			render(){
		     	return(
		     	<div className="UserTable">
				{this.state.overlay && <Overlay />} {/*dzax masy false e aj masy true, (or` mer overlay-y), ev-ov stugum enq, 
				ete 2 sn el cisht en, uremn paymani mijiny katarum e` render e linum overlay-y*/}
				<div id="theader">stex inch-vor info petq e cuyc tanq?</div>
					<div id="scroll">
			     	<table className="table">
			     	<TableHeader selectAll={this.selectAll} headerdata={this.state.data[0]} className="tableheader"/>
			     	<TableRow ref={childTableRow=>{this.tablerow=childTableRow}} selectedMailsAddDelete={this.selectedMailsAddDelete} update={this.updateTable} dataArray={this.state.data}/>
			     	</table> 
					
			     </div>
			     <button className="" disabled={!this.state.isCheckedMails} onClick = {this.createEmailList}>Create Email List</button>
				 <button className="" disabled={!this.state.isCheckedMails}onClick = {this.DeleteSelected}>Delete selected</button>
				 <button className="" onClick = {this.AddContact}>Add contact</button>
				 <button className="" onClick = {this.UploadFileToContacts}>Upload file to contacts</button>
				 <button className="" disabled={!this.state.isCheckedMails} onClick = {this.sentDataBtn}>Send data</button>
				 <AddRowTable  update={this.updateTable} Id={this.state.data.length + 1} className="addrowtable"/>
				 </div>
		     	);
		     }
     	
	}
    export default Table;