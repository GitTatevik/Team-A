import React,{Component} from 'react';
import call from '../Fetch.js'
import Overlay from './Overlay.js';

class AddtoExisting extends Component {
    constructor(props){
        super(props);
        this.state={
            maillists:[],
            selectedMailList:"",
            loading:false
        };

        this.selectOnChange = this.selectOnChange.bind(this);
        this.close = this.close.bind(this);
        this.addToMailList =  this.addToMailList.bind(this);
    }
    close(){
    this.props.closePopup();
    }
    addToMailList(){
        this.setState({loading:true});
       fetch('http://crmbeta.azurewebsites.net/api/EmailLists/add/' + this.state.selectedMailList,{
           method: 'PUT',
           headers: {'Accept': 'application/json','Content-Type': 'application/json'},
           body: JSON.stringify(this.props.selectedContacts)
             }).then(response=>{
            if(response.ok === true){
                this.props.getResponseText('Added successfully');
            }
            else{
                this.props.getResponseText("Please select a Mailing list");
            }
           this.setState({loading:false});
        });
        this.close();
    }
    selectOnChange(event){
        this.setState({selectedMailList:event.target.value})

    }
    componentDidMount(){
        this.setState({loading:true});
        call('http://crmbeta.azurewebsites.net/api/EmailLists', 'GET').then(list => {
            this.setState({
                maillists: list,
                loading:false
            });
        })
    }
    render(){
        return(
            <div className="addToExisting">
                {this.state.loading && <Overlay />}
                <div className="uploadContainer">
                   <select onChange={this.selectOnChange} value={this.state.selectedMailList}>
                   <option value="">Select a Mailing list</option>
                       { this.state.maillists.map((value, index) => {
                           return (
                               <option key={index} value={value.EmailListID}>{value.EmailListName}</option>
                           );
                       })
                       }
                   </select>
                    <div className="fileButtons">
                        <button onClick={this.addToMailList} className="addBtn" id="sendBtn">Add</button>
                        <button onClick={this.close} className="addBtn back">Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default AddtoExisting;
