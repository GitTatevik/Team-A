import '../StyleSheet/Table.css';
import React,{Component} from 'react';
class UploadFile extends Component {

    render(){
        return(
            <div className="uploadContainer">
                <form className="uploadCSV" action="http://crmbeta.azurewebsites.net/api/contacts/upload" encType="multipart/form-data" method="POST" >
                    <input name="data"type="file" className="fileButtons"></input>
                    <input className="addBtn" type="submit" id="sendBtn"></input>
                <button className=" back addBtn" onClick={this.props.back}>Back</button>
                  </form>
            </div>
        );
    }

}
export default UploadFile;