import React,{Component} from 'react';
import call from '../Fetch.js';

class TemplateSelect extends Component {
    constructor(props) {
        super(props);
        this.selectOnChange = this.selectOnChange.bind(this);
    }
    
    selectOnChange(event){
        this.props.getValue(event.target.value,this.state.selected);
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
        return(
            <select onChange={this.selectOnChange} defaultValue="">
                <option value="0">Select a Template</option>
                <option value="1">Anniversary</option>
                <option value="2">Birthday</option>
                <option value="3">Christmas</option>
            </select>
        );
    }

}
export default TemplateSelect;
