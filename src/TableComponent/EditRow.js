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

					if(this.props.propName==="Action"){
						editobj.Action=inputvalue;
						}
					if(this.props.propName==="fullName"){
						editobj.fullName=inputvalue;
						}
					if(this.props.propName==="companyName"){
						editobj.companyName=inputvalue;
						}
					if(this.props.propName==="position"){
						editobj.position=inputvalue;
					}
					if(this.props.propName==="country"){
						editobj.country=inputvalue;
					}
					if(this.props.propName==="email"){
						editobj.email=inputvalue;
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