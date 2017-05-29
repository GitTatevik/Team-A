import React, { Component } from 'react';
import EditRow from './EditRow.js';
import array from '../array.js';


class TableRow extends Component{
		     constructor(props){
			     super(props);
		     this.state={
		                editingShow:false,
		                editRowData:{},
		      			editRowIndex:"",
						//guidArray: []
		     			}
			     this.deleteRow=this.deleteRow.bind(this);
			     this.editRow=this.editRow.bind(this);
			     this.saveEditing=this.saveEditing.bind(this);
			     this.cancel=this.cancel.bind(this);
				 this.chackechange = this.chackechange.bind(this);
				 this.deleteChecks=this.deleteChecks.bind(this);
				 this.checkboxes=[];
				
			    // var editRowData={};
		     }
			 
			 deleteChecks(){
				 for(let i of this.checkboxes){
					 
					 i.checked = false;
					 
				 }
				 
			 }
	     deleteRow(event){
		      // console.log(event.target.id);
		     //console.log(array);
		     array.splice(event.target.id,1);
		      //event.target.parentNode.parentNode.remove();
		      this.props.update();
	     }
	     editRow(event){
		     console.log(event.target.id);
		     this.setState({
		     				editingShow:true,
		     				editRowData:this.props.dataArray[event.target.id],
		     				editRowIndex:event.target.id 
		     				});

	     }
	     saveEditing(){
	      this.props.update();
	      this.setState({
		     				editingShow:false 
		     				});

	     }
	     cancel(){
	      this.props.update();
	      this.setState({
		     				editingShow:false 
		     				});
	     }
		
		 chackechange(event){
			 /*let guidArray = this.state.guidArray;
			if(event.target.checked === true){
					guidArray.push(this.props.dataArray[event.target.id].guid);
			}
			else{
				for(let i = 0; i < this.state.guidArray.length; ++i){
					if(this.props.dataArray[event.target.id].guid === this.state.guidArray[i]){
						this.state.guidArray.splice(i,1);
						
					}
				}
			 }*/
			this.props.selectedMailsAddDelete(event.target.id, event.target.checked);
			
		 }
		 
	     render(){
		     const data=this.props.dataArray;
			 this.checkboxes=[];
		      //console.log("TableRow Data :",data);
		      if(this.state.editingShow){
		         /* const editingrow = data[this.state.editRowIndex];
		          const editrow=*/
		     {/*	<tr  id ="editingrow">
			     	<td key={editingrow.fullName}>
				     	<EditRow update={this.props.update} data={editingrow.fullName} propName="fullName" editingData={this.state.editRowData} 
				     	show={this.state.editingShow} indexEdit={this.state.editRowIndex}/>
				     
			     	</td>
			     	<td key={editingrow.companyName}>
				     	<EditRow update={this.props.update} data={editingrow.companyName} propName="companyName" editingData={this.state.editRowData} 
				     	show={this.state.editingShow} indexEdit={this.state.editRowIndex}/>
				     	
				     </td>
			     	<td key={editingrow.position}>
			     	    <EditRow update={this.props.update} data={editingrow.position} propName="position" editingData={this.state.editRowData} show={this.state.editingShow} indexEdit={this.state.editRowIndex}/>
			     	    
			     	</td>
			     	<td key={editingrow.country}>
			     	   {editingrow.country}
			     	</td>
			     	</td>
					 	<td key={data.email}>
				     	<EditRow update={this.props.update} data={data.email} propName="email" editingData={this.state.editRowData} 
				     	show={this.state.editingShow} indexEdit={this.state.editRowIndex}/>
				     	{data.email}
				     </td>
		     	</tr>
		     	 const row = data.map((data,index)=>
		     	
		     	<tr key={index} ref={index}>
			     	<td key={data.Firstname}>
				     	{data.Firstname}
			     	</td>
			     	<td key={data.Lastname}>
				     	{data.Lastname}
				     </td>
			     	<td key={data.Mail}>
			     	    {data.Mail}
			     	</td>
			     	<td key={data.Id} id ="ids">
			     	    {data.Id}
			     	</td>
			     	<td colSpan="2"><button className ="deletebutton" onClick={this.deleteRow}  id={index}>Delete</button><button id ={index} onClick={this.editRow}>Edit</button></td>
		     	</tr>
		     	);

		     	
		     	return(
		     		<tbody>
		     			{editrow}
		     			{row}
		     		
		     		</tbody>*/}
				// );

		      }
		      const tablerows = data.map((data,index)=>
		     	<tr key={index} ref={index}>

					<td> <input type="checkbox" ref={checkbox=>{this.checkboxes.push(checkbox)}} onChange={this.chackechange} id={index} /> {/* <button id ={index} onClick={this.editRow} className="editbutton">Edit</button><button className ="deletebutton" onClick={this.deleteRow}  id={index}>Delete</button>*/}</td>
			     	<td key={data.fullName}>
				     	<EditRow update={this.props.update} data={data.fullName} propName="fullName" editingData={this.state.editRowData} 
				     	show={this.state.editingShow} indexEdit={this.state.editRowIndex}/>
				     	{data.fullName}
			     	</td>
			     	<td key={data.companyName}>
				     	<EditRow update={this.props.update} data={data.companyName} propName="companyName" editingData={this.state.editRowData} 
				     	show={this.state.editingShow} indexEdit={this.state.editRowIndex}/>
				     	{data.companyName}
				     </td>
			     	<td key={data.position}>
			     	    {data.position}
			     	</td>
			     	<td key={data.country}>
			     	    {data.country}
			     	</td>
					 	<td key={data.email}>
				     	<EditRow update={this.props.update} data={data.email} propName="email" editingData={this.state.editRowData} 
				     	show={this.state.editingShow} indexEdit={this.state.editRowIndex}/>
				     	{data.email}
				     </td>
			     	
		     	</tr>
		     	);
		     	return(
				
		     		<tbody>
		     			{tablerows}
						
		     		</tbody>
					
		     	);
		      

	     }

	}
    export default TableRow;