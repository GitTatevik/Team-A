import React, {Component} from 'react';
import call from '../Fetch.js';
import Overlay from './Overlay.js';

class TemplateSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            templateValue: '',
            loading: false
        };
        this.selectOnChange = this.selectOnChange.bind(this);
    }

    selectOnChange(event) {
        this.setState({templateValue: event.target.value});
        this.props.getValue(event.target.value);
    }

    componentDidMount() {
        this.setState({loading: true});
        call('http://crmbeta.azurewebsites.net/api/Templates', 'GET').then(response => {
            this.setState({
                Template: response,
                loading: false
            });
        });
    }

    render() {
        return (
            <div className="selectContainer">
                {this.state.loading && <Overlay />}
                <select onChange={this.selectOnChange}>
                    <option value="0">Select a Template</option>
                    <option value="1">Anniversary</option>
                    <option value="2">Birthday</option>
                    <option value="3">Christmas</option>
                </select>
            </div>
        );
    }

}
export default TemplateSelect;
