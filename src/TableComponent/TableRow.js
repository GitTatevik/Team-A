import React, { Component } from 'react';
import EditRow from './EditRow.js';
import array from '../array.js';
import Fetch from '../Fetch.js';

class TableRow extends Component{
		     constructor(props){
			     super(props);
		     this.state={
		                editingShow:false,
		                editRowData:{},
		      			editRowIndex:""
		     			}
			     this.deleteRow=this.deleteRow.bind(this);
			     this.editRow=this.editRow.bind(this);
			     this.saveEditing=this.saveEditing.bind(this);
			     this.cancel=this.cancel.bind(this);
			    // var editRowData={};
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
	     render(){
		     const data=this.props.dataArray
		      //console.log("TableRow Data :",data);
		      if(this.state.editingShow){
		          const editingrow = data[this.state.editRowIndex];
		          const editrow=
		     	<tr  id ="editingrow">
			     	<td key={editingrow.Firstname}>
				     	<EditRow update={this.props.update} data={editingrow.Firstname} propName="Firstname" editingData={this.state.editRowData} 
				     	show={this.state.editingShow} indexEdit={this.state.editRowIndex}/>
				     
			     	</td>
			     	<td key={editingrow.Lastname}>
				     	<EditRow update={this.props.update} data={editingrow.Lastname} propName="Lastname" editingData={this.state.editRowData} 
				     	show={this.state.editingShow} indexEdit={this.state.editRowIndex}/>
				     	
				     </td>
			     	<td key={editingrow.Mail}>
			     	    <EditRow update={this.props.update} data={editingrow.Mail} propName="Mail" editingData={this.state.editRowData} show={this.state.editingShow} indexEdit={this.state.editRowIndex}/>
			     	    
			     	</td>
			     	<td key={editingrow.Id} id ="ids">
			     	   {editingrow.Id}
			     	</td>
			     	<td colSpan="2"><button onClick={this.saveEditing} className="savebutton" >Save Change</button><button onClick={this.cancel}>Cancel</button></td>
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
		     		
		     		</tbody>
		     	);

		      }
		      const row = data.map((data,index)=>
		     	<tr key={index} ref={index}>
			     	<td key={data.Firstname}>
				     	<EditRow update={this.props.update} data={data.Firstname} propName="Firstname" editingData={this.state.editRowData} 
				     	show={this.state.editingShow} indexEdit={this.state.editRowIndex}/>
				     	{data.Firstname}
			     	</td>
			     	<td key={data.Lastname}>
				     	<EditRow update={this.props.update} data={data.Lastname} propName="Lastname" editingData={this.state.editRowData} 
				     	show={this.state.editingShow} indexEdit={this.state.editRowIndex}/>
				     	{data.Lastname}
				     </td>
			     	<td key={data.Mail}>
			     	    <EditRow update={this.props.update} data={data.Mail} propName="Mail" editingData={this.state.editRowData} show={this.state.editingShow} indexEdit={this.state.editRowIndex}/>
			     	    {data.Mail}
			     	</td>
			     	<td key={data.Id} id ="ids">
			     	    {data.Id}
			     	</td>
			     	<td colSpan="2"> <input type="checkbox"/> {/* <button id ={index} onClick={this.editRow} className="editbutton">Edit</button><button className ="deletebutton" onClick={this.deleteRow}  id={index}>Delete</button>*/}</td>
		     	</tr>
		     	);
		     	return(
		     		<tbody>
		     			{row}
		     		
		     		</tbody>
		     	);
		      

	     }

	}
    export default TableRow;