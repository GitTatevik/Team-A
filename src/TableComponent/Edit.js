import React,{Component} from 'react';
import call from '../Fetch.js';
class Edit extends Component {
	constructor(props) {
		super(props);
		this.save = this.save.bind(this);
	}
	save() {
		let editObj = {
			Fullname: this.refs.FullName.value,
			Companyname: this.refs.CompanyName.value,
			Position: this.refs.position.value,
			Country: this.refs.country.value,
			Email: this.refs.email.value

		}
		let self = this;
		//console.log("save edited data",editObj);
		//alert("Save edited contact");
		call('http://crmbeta.azurewebsites.net/api/Contacts/' + this.props.data.Guid, "PUT", editObj).then(function(data) {
			self.props.update();

		});
		this.props.save();

	}

			render(){

				return(
					<div className="openWindow">
				<div className="formContainer">
				<div id="flexEdit">
					<p><span>Full name</span> <input type="text" defaultValue={this.props.data["Full Name"]} ref="FullName"/></p>
					<p><span>Company name</span> <input type="text"  defaultValue={this.props.data["Company Name"]}ref="CompanyName"/></p>
					<p>Position <input type="text"  defaultValue={this.props.data.Position} ref="position"/></p>
					<p>Country <input type="text"  defaultValue={this.props.data.Country} ref="country"/></p>
					<p>Email <input type="email"  defaultValue={this.props.data.Email} ref="email"/></p>
					<p><button className="addBtn saveBtn" onClick={this.save}>Save</button>
						<button className="addBtn" onClick={this.props.cancel}>Cancel</button>
					</p>
				</div>
				</div>
					</div>
				);
			}

	}
    export default Edit;
