import React,{Component} from 'react';
import TemplateSelect from '../TableComponent/TemplateSelect.js';
class TemplateSelectPopup extends Component {
    constructor(props){
        super(props);
        this.state={
            disabled:true
        }
    }


    render(){
        return(
            <div className="uploadContainer">
                <TemplateSelect />
            </div>
        );
    }

}
export default TemplateSelectPopup;

