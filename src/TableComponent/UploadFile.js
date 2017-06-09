import React,{Component} from 'react';

class UploadFile extends Component {
        constructor(props){
            super(props);
            this.state={
                disabled:true
            };
            this.UploadFile = this.UploadFile.bind(this);
            this.fileInputOnChange = this.fileInputOnChange.bind(this);
            
        }

    UploadFile() {
        if (document.querySelector('input[type="file"]').files[0]) {
            let data = new FormData();
            let fileData = document.querySelector('input[type="file"]').files[0];
            data.append("data", fileData);
            fetch("http://crmbeta.azurewebsites.net/api/contacts/upload", {
                method: "POST",
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
                body: data
            }).then(res => {
                if (res.ok) {
                    this.props.getResponseText("Added successfully");
                }
                if (res.status === 409) {
                   this.props.getResponseText("This file already exists");
                }
                return res.json()
            });
        }
        else {
            this.props.getResponseText("Please choose a file");
        }
            this.props.update();
            this.props.closePopup();
    }
     fileInputOnChange(){
         if( document.querySelector('input[type="file"]').files[0]){
             this.setState({
                 disabled:false
             })
         }else{
             this.setState({
                 disabled:true
             })
         }
     }
	render(){
        return(
            <div className="uploadContainer">
                   <input name="data" type="file" onChange={this.fileInputOnChange} />
                <div className="fileButtons">
                   <button className="addBtn" id="sendBtn" onClick={this.UploadFile} >Upload</button>
                    <button className="back addBtn" onClick={this.props.closePopup}>Back</button>
                </div>
            </div>
        );
    }
	
	}
    export default UploadFile;

