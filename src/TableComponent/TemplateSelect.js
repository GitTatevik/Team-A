import React,{Component} from 'react';
import call from '../Fetch.js';

class TemplateSelect extends Component {
	constructor(props) {
		super(props);
        this.state={
            Template:[]
        }
		this.selectOnChange = this.selectOnChange.bind(this);
	}
    componentDidMount(){
        call('http://crmbeta.azurewebsites.net/api/Templates', 'GET').then(response => {
					this.setState({
						Template: response
					});
                 console.log(response);
                });
    }
    selectOnChange(event){
				//console.log("You Select ",event.target.value);
                this.props.getValue(event.target.value);
			}
	render(){
        // let data = this.state.Template;
        // const options=data.map((data,index)=>{
        //     console.log("Template",data.TemplateName);
        //     <option key={data.Id} value={data.Id} >{data.TemplateName}</option>
        // })
        return(
            <select onChange={this.selectOnChange} defaultValue="4"> 
            <option value="4">Happy Birthday</option>
            <option value="6">Merry Christmas</option>
            <option value="5">Congratulations</option>
            {/*{options}*/}
            </select>
        );
    }

	}
    export default TemplateSelect;
