import React,{Component} from 'react';

class AddContact extends Component{
		 constructor(props) {
	    super(props);
	    this.state = {
	    	responseText:''
		};
		this.saveContact = this.saveContact.bind(this);
	  }
	  	saveContact(){
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

				  	fetch('http://crmbeta.azurewebsites.net/api/Contacts',{method:"POST",
                          headers: {'Accept': 'application/json','Content-Type': 'application/json'},
                          body : JSON.stringify(newContact),
						}
                  	).then(response => {
                          if (!response.ok) {
                          	this.props.getResponseText('Please enter a valid email');
                              this.setState({responseText:response.statusText});
                          }
						  else {
								this.props.getResponseText('Contact Added');
								this.props.update();
						  }
                      });
				 this.props.closePopup();
			  }
			  else{
                  this.props.getResponseText('Please fill all fields');
			  }
		  }

		render(){
			return(
				<div className="AddRow1">
					<input type="text"  ref="fullName" className="addInput" placeholder="Full Name"/>
					 <input type="text"  ref="companyName" className="addInput" placeholder="Company"/>
					 <input type="text"  ref="position" className="addInput" placeholder="Position"/>
					 <input type="text"  ref="country" className="addInput" placeholder="Country"/>
					 <input type="email" ref="email" className="addInput" placeholder="Email"/>
					 <div className="buttonsCont">
						 <button className="addBtn" onClick={this.saveContact}>Save</button>
					  <button className="addBtn" onClick={this.props.closePopup}>Cancel</button>
					 </div>
   				</div>
			);
		}
	}
export default AddContact;
