import React,{Component} from 'react';
import call from '../Fetch.js';

class TemplateSelect extends Component {
    constructor(props) {
        super(props);
        // this.state={
        //     Template:[]
        // }
        this.selectOnChange = this.selectOnChange.bind(this);
    }
    
    selectOnChange(event){
        //console.log("You Select ",event.target.value);
           this.props.getValue(event.target.value);
    }

    componentDidMount(){
        call('http://crmbeta.azurewebsites.net/api/Templates', 'GET').then(response => {
            this.setState({
                Template: response
            });
            console.log(response);
        });
    }
    render(){
        // let data = this.state.Template;
        // const options=data.map((data,index)=>{
        //     console.log("Template",data.TemplateName);
        //     <option key={data.Id} value={data.Id} >{data.TemplateName}</option>
        // })
        return(
            <select onChange={this.selectOnChange} defaultValue="" >
                <option value="0">No selected</option>
                <option value="1">Anniversary</option>
                <option value="2">Birthday</option>
                <option value="3">Christmas</option>
                {/*{options}*/}
            </select>
        );
    }

}
export default TemplateSelect;
