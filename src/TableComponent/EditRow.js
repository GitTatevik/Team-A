import React,{Component} from 'react';
import data from '../array.js';

class EditRow  extends Component{
			constructor(props){
				super(props);
				
			this.onChange=this.onChange.bind(this);
			}
		onChange(event){
				let id=event.target.id;
				let inputvalue=this.refs[id].value;
				let editobj=this.props.editingData;
				//console.log(this.props.editingData);

					if(this.props.propName==="Firstname"){
						editobj.Firstname=inputvalue;
						}
					if(this.props.propName==="Lastname"){
						editobj.Lastname=inputvalue;
						}
					if(this.props.propName==="Mail"){
						editobj.Mail=inputvalue;
						}
					if(this.props.propName==="Id"){
						editobj.Id=inputvalue;
						}
	        data[this.props.index]=editobj;
	        //this.props.update();
				console.log(data);
			console.log(this.props.indexEdit);
			}

		render(){
			 let inputData=this.props.data;
			//console.log(this.props.propName);
			if(this.props.show ){

				return(
								<input type="text" defaultValue={inputData} onChange={this.onChange} ref={inputData} id={inputData}/>
					
					);
			}
			return null;
			}
	}
    export default EditRow;