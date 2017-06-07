import React,{Component} from 'react';
import call from '../Fetch.js'
class AddtoExisting extends Component {
    constructor(props){
        super(props);
        this.state={
            maillists:[],
            selectedMailList:""
        }
        this.selectOnChange = this.selectOnChange.bind(this);
        this.close = this.close.bind(this);
        this.addToMailList =  this.addToMailList.bind(this);
    }
    close(){
    this.props.closePopup();
    }
    addToMailList(){
       fetch('http://crmbeta.azurewebsites.net/api/EmailLists/add/' + this.state.selectedMailList,{
           method: 'PUT',
           headers: {'Accept': 'application/json','Content-Type': 'application/json'},
           body: JSON.stringify(this.props.selectedContacts)
             }).then(response=>{
            if(response.ok === true){
                alert("Contacts added to mailing list");
            }
            else{
                alert("Sending failure :" + response.statusText);
            }
        })
        this.close();
    }
    selectOnChange(event){
        this.setState({selectedMailList:event.target.value})

    }
    componentDidMount(){
        let self = this;
        call('http://crmbeta.azurewebsites.net/api/EmailLists', 'GET').then(function (list) {
            self.setState({
                maillists: list
            });
        })

    }
    render(){
        return(
            <div className="uploadContainer">
               <select onChange={this.selectOnChange} value={this.state.selectedMailList}>
                   { this.state.maillists.map((value, index) => {
                       return (
                           <option key={index} value={value.EmailListID}>{value.EmailListName}</option>
                       );

                   })
                   }
               </select>
                <button onClick={this.addToMailList}>Add</button>
                <button onClick={this.close}>Cancel</button>
            </div>
        );
    }

}
export default AddtoExisting;
