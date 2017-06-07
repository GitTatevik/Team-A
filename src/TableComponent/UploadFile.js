import React,{Component} from 'react';

class UploadFile extends Component {
        constructor(props){
            super(props);
            this.state={
                disabled:true
            }

            this.UploadFile =this.UploadFile.bind(this);
            this.fileInputOnChange = this.fileInputOnChange.bind(this);
            
        }

UploadFile(){
    if( document.querySelector('input[type="file"]').files[0]){
    let self = this;
        let data = new FormData();
    	let fileData = document.querySelector('input[type="file"]').files[0];
    	data.append("data", fileData);	
			fetch("http://crmbeta.azurewebsites.net/api/contacts/upload", {
				method: "POST",
				"Content-Type": "multipart/form-data",
				"Accept": "application/json",
				body: data
			}).then(function (res) {
				console.log("response",res)
                if(res.status === 200){
                    self.props.cancelUpload();
                    self.props.update();
                }
                if(res.status===409){
                    alert("File have been added");
                }
				return res.json()
			})//.then(res => console.log(res))
      }else{
          alert("No File");
      }
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
                   <input name="data" type="file" onChange={this.fileInputOnChange} ></input>
                <div className="fileButtons">
                   <button className="addBtn" id="sendBtn" onClick={this.UploadFile} >Upload</button>
                    <button className="back addBtn" onClick={this.props.cancelUpload}>Back</button>
                </div>
            </div>
        );
    }
	
	}
    export default UploadFile;

