import React, { Component } from 'react';
import TableHeader from'./TableHeader.js';
import TableRow from './TableRow.js';
import AddRowTable from './AddRowTable.js';
import call from '../Fetch.js';
import '../StyleSheet/Table.css';


//	import array from '../array.js';

class Table extends Component{
			constructor(props){
				super(props);
				this.state={
				data:[]
				};
				this.updateTable=this.updateTable.bind(this);
				this.sentDataBtn = this.sentDataBtn.bind(this);
				this.selectedMailsAddDelete = this.selectedMailsAddDelete.bind(this);
				this.selectedMails=[];
			}
			
			
			selectedMailsAddDelete(id,isChecked){ // is checked-ov imanalu enq check exel e te che,checkboxy
			if(isChecked===true){
			this.selectedMails.push(this.state.data[id].guid);
			}
			else{
				let idChecking = this.selectedMails.indexOf(this.state.data[id].guid);
				if(idChecking !== -1){ 
				this.selectedMails.splice(idChecking,1);
				}
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
				this.setState({data:response});
				}
				});
			}
			sentDataBtn(){
				call('api/EmailSender?TemplateId=1','POST', this.selectedMails).then(function(response){
				if(response.error){
				alert(response.message)
				}
				else{
			console.log(response)
				}
				});
			
			this.selectedMails=[];
			this.tablerow.deleteChecks();
		 }
			
			render(){
		     	return(
		     	<div className="UserTable">
				<div id="theader">User Contact List</div>
					<div id="scroll">
			     	<table className="table">
			     	<TableHeader headerdata={this.state.data[0]} className="tableheader"/>
			     	<TableRow ref={childTableRow=>{this.tablerow=childTableRow}} selectedMailsAddDelete={this.selectedMailsAddDelete} update={this.updateTable} dataArray={this.state.data}/>
			     	</table>
					
			     </div>
				 <button className="btn_table" onClick = {this.sentDataBtn}>Send data</button>
				 <AddRowTable  update={this.updateTable} Id={this.state.data.length + 1} className="addrowtable"/>
				 </div>
		     	);
		     }
     	
	}
    export default Table;