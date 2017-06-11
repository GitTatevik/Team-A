import React,{Component} from 'react';
import call from '../Fetch.js';
import '../StyleSheet/Table.css';

class Edit extends Component {
	constructor(props) {
		super(props);
        this.save = this.save.bind(this);
	}
	save(event) {
		event.preventDefault();
        if(this.refs.fullName.value.length && this.refs.companyName.value.length &&
            this.refs.position.value.length && this.refs.country.value.length && this.refs.email.value.length) {
            let checkEmail =  /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/
            if (checkEmail.test(this.refs.email.value)) {
                let editObj = {
                    Fullname: this.refs.fullName.value,
                    Companyname: this.refs.companyName.value,
                    Position: this.refs.position.value,
                    Country: this.refs.country.value,
                    Email: this.refs.email.value
                };
                call('http://crmbeta.azurewebsites.net/api/Contacts/' + this.props.data.Guid, "PUT", editObj).then(() => {
                    this.props.save();
                    this.props.update();
                });
            }
        }
	}
	render(){
		return(
			<div className="openWindow" >
				<div className="formContainer">
					<form action="#" method="#" onSubmit={this.save}>
						<div id="flexEdit">
							<p><span>Full name</span>
								<input required type="text" defaultValue={this.props.data["Full Name"]} ref="fullName"/>
							</p>
							<p>
								<span>Company name</span>
								<input type="text" required defaultValue={this.props.data["Company Name"]} ref="companyName"/>
							</p>
							<p><span>Position</span>
								<input type="text" required defaultValue={this.props.data.Position} ref="position"/>
							</p>
							<p><span>Country</span>
								<input type="text" required defaultValue={this.props.data.Country} ref="country"/>
							</p>
							<p>
								<span>Email</span>
								<input type="email"  required defaultValue={this.props.data.Email} ref="email"
											pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"/>
							</p>
							</div>
							<div className="buttonsCont">
							<input type="submit" className="addBtn saveBtn"  defaultValue="Save"/>
							<input type="button" className="addBtn" onClick={this.props.cancel} defaultValue="Cancel"/>
						</div>
					</form>
				</div>
			</div>
		);
	}

	}
    export default Edit;
