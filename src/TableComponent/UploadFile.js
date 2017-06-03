import React,{Component} from 'react';
import '../StyleSheet/Table.css';
class UploadFile extends Component {

	render(){
        return(
					<div className="uploadContainer">
                <input type="file" className="fileButtons"/>
                    <div className="uploadButtonsCont">
                    <button className="uploadButtons">Upload</button>
                    <button className="uploadButtons" onClick={this.props.cancelUpload}>Cancel</button>
                </div>
      		</div>
        );
    }

	}
    export default UploadFile;
