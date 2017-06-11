import React,{Component} from 'react';
import '../StyleSheet/Table.css';
import Overlay from './Overlay.js';

class AddContact extends Component{
    constructor(props) {
        super(props);
        this.state = {
            responseText:'',
			laoding:false
        };
        this.saveContact = this.saveContact.bind(this);
    }
    saveContact(event){
        event.preventDefault();
        if(this.refs.fullName.value.length && this.refs.companyName.value.length &&
            this.refs.position.value.length && this.refs.country.value.length && this.refs.email.value.length){
            let checkEmail =  /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/
            if(checkEmail.test(this.refs.email.value)) {
                let newContact = {
                    Fullname: this.refs.fullName.value,
                    Companyname: this.refs.companyName.value,
                    Position: this.refs.position.value,
                    Country: this.refs.country.value,
                    Email: this.refs.email.value
                };


				this.setState({loading:true});
                fetch('http://crmbeta.azurewebsites.net/api/Contacts',
                    {
                        method: "POST",
                        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                        body: JSON.stringify(newContact),
                    }
                ).then(response => {
                    if (!response.ok) {
                        this.setState({responseText: response.statusText});
                        this.props.getResponseText('This mail already exists');

                    }
                    else {
                        this.props.getResponseText('Contact Added');
                        this.refs.fullName.value = "";
                        this.refs.companyName.value = "";
                        this.refs.position.value = "";
                        this.refs.country.value = "";
                        this.refs.email.value = "";
                    }
                    this.setState({loading:false});
                    this.props.update();
                });
                this.props.closePopup();
            }
        }
    }

    render(){
        return(
			<div className="AddRow1">
                {this.state.loading && <Overlay />}
				<form action="#" method="#" className="addForm" onSubmit={this.saveContact}>
					<input required type="text" name="text" ref="fullName" className="addInput" placeholder="Full Name"/>
					<input required type="text" name="text" ref="companyName" className="addInput" placeholder="Company"/>
					<input required type="text" name="text" ref="position" className="addInput" placeholder="Position"/>
					<input required type="text" name="text" ref="country" className="addInput" placeholder="Country"/>
					<input required type="email" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
						   ref="email" placeholder="Email" className="addInput" />
					<div className="buttonsCont">
						<input type="submit" className="addBtn"  defaultValue="Save"/>
						<input type="button" className="addBtn" onClick={this.props.closePopup} defaultValue="Cancel"/>
					</div>
				</form>
			</div>
        );
    }
}
export default AddContact;
