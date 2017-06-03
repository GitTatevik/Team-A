import React,{Component} from 'react';
import call from '../Fetch.js';
class AddContact extends Component{
		 constructor(props) {
	    super(props);
	    this.state = {};
		this.saveContact = this.saveContact.bind(this);
	  }
	  	saveContact(){
			  //let guid='';
			  if(this.refs.fullName.value && this.refs.companyName.value &&
			   	this.refs.position.value && this.refs.country.value && this.refs.email.value){
				let newContact={
					Fullname:this.refs.fullName.value,
					Companyname:this.refs.companyName.value,
					Position:this.refs.position.value,
					Country:this.refs.country.value,
					Email:this.refs.email.value
				}
				 this.refs.fullName.value="";
				 this.refs.companyName.value="";
				this.refs.position.value ="";
				 this.refs.country.value="";
				 this.refs.email.value="";
				 
			this.props.update();
			let self =this;
			call('http://crmbeta.azurewebsites.net/api/Contacts','POST',newContact).then(function(data){
				self.props.update();

			});
			 	//alert("save");
				 this.props.back();
			   }else{
				alert("no valid contact");
			}
		  }

		render(){

			return(
				<div className="AddRow">
      <input type="text"  ref="fullName" className="addInput" placeholder="Full Name"/>
      <input type="text"  ref="companyName" className="addInput" placeholder="Company"/>
      <input type="text"  ref="position" className="addInput" placeholder="Position"/>
      <input type="text"  ref="country" className="addInput" placeholder="Country"/>
      <input type="email" ref="email" className="addInput" placeholder="Email"/>
     <div className="buttonsCont">
         <button className="addBtn" onClick={this.saveContact}>Save</button>
      <button className="addBtn" onClick={this.props.back}>Cancel</button>
     </div>
    </div>

			);
		}
	}
export default AddContact;
