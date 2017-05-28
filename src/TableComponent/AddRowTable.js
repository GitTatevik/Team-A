import React,{Component} from 'react';
import array from '../array.js';
import call from '../Fetch.js';

class AddRowTable extends Component{
		 constructor(props) {
	    super(props);
	    this.state = {
				    display:false
				    };
	    this.addRow=this.addRow.bind(this);
	    this.save= this.save.bind(this);
		
		 
	  }
		
		 addRow(){
		             this.setState({display:true});
		            }
	     save(){
	     let newRow={
		     	     Firstname:this.refs.Firstname.value,
					 Lastname:this.refs.Lastname.value,
					 
					 Mail:this.refs.Mail.value,
					 Id:this.props.Id
		             };
		             if(this.refs.Firstname.value&&this.refs.Lastname.value&&this.refs.Mail.value){
						 let regex = new RegExp("^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$");
					 if(regex.test(this.refs.Mail.value) == true){
	                 array.push(newRow);
		             this.props.update();
					  this.setState({display:false});
					 }
					 else{
						 alert("Please enter a valid email");
					 }
		             }

	              
	     }
		 
		  
		 
		render(){
				if(this.state.display){
					return(
						<div className="AddRow">
				     		<input type="text" ref="Firstname" placeholder="Firstname" />
				     		<input type="text" ref="Lastname" placeholder="Lastname"/>
				     		<input type="email" required ref="Mail" placeholder="Mail"/>
				     		<span>Id : {this.props.Id}</span>
				     		<button  onClick={this.save}>Add Row</button>
				     	</div>
					);

				}
			return(
			<div className="AddRow">
			
				{/*<button className="btn_table" onClick={this.addRow}>Add Row Table</button>*/}
			</div>
			);
		}
	}	
export default AddRowTable;