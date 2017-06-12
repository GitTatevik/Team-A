import React,{Component} from 'react';
import '../StyleSheet/Table.css';
import Overlay from './Overlay.js';

class UploadFile extends Component {
        constructor(props){
            super(props);
            this.state={
                disabled:true,
                loading:false
            };
            this.UploadFile = this.UploadFile.bind(this);
            this.fileInputOnChange = this.fileInputOnChange.bind(this);
        }

    UploadFile() {
        if (this.refs.fileInput.files[0]) {
            let data = new FormData();
            let fileData = this.refs.fileInput.files[0];
            data.append("data", fileData);
            this.setState({loading:true});
            fetch("http://crmbeta.azurewebsites.net/api/contacts/upload", {
                method: "POST",
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
                body: data
            }).then(res => {
                if (res.ok) {
                    this.props.getResponseText('Added successfully');
                }
                if (res.status === 409) {
                    this.props.getResponseText('This file already exists or incorrect')
                }
                if(res.status === 501){
                    this.props.getResponseText("Incorrect type of file");
                }
                this.setState({loading:false});
                this.props.update();
                return res.json()

            });
        }
        else {
            this.props.getResponseText("Please choose a file");
        }

            this.refs.fileInput.files[0].value = '';
            this.props.closePopup();
    }
     fileInputOnChange(){
         if( this.refs.fileInput.files[0]){
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
                {this.state.loading && <Overlay />}
                <input name="data" type="file" id="fileUpload" ref="fileInput" onChange={this.fileInputOnChange} />
                    <div className="fileButtons">
                     <button className="addBtn" id="sendBtn" onClick={this.UploadFile} disabled={this.state.disabled?'disabled':''} >Upload</button>
                     <button className="back addBtn cancelUpload" onClick={this.props.closePopup}>Back</button>
                </div>
            </div>
        );
    }
	
	}
    export default UploadFile;

