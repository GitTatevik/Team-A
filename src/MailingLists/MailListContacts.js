import React,{Component} from 'react';
class MailListContacts extends Component {
	constructor(props) {
		super(props);
        this.state={
            data:[]
        }
		
	}

	render(){
         const data=this.props.data
         const header = <thead>
                            <tr>
                                <th>
                                    {this.props.header}
                                </th>
                            </tr>
                        </thead>
        console.log("contacts",data)
		let tdArray=[];
		      for(let i =0;i<data.length;++i){
				tdArray.push(<td>{data[i]}</td>)
			  }
			  console.log("array",tdArray);
		     	// <tr key={index} ref={index}>
					 {/*<td key={index} id="checkbox">
						 <input type="checkbox" ref={index} id={index} onChange ={this.checkBoxOnChange }  /> 
					 </td>*/}
			     	 {/*<td key={data[index]}>
				     	{data[index]}
                     </td>*/}
		     	// </tr>
		     	return(
                        <div className ="inlineBlock">
                            <table>
                                {header}
                                <tbody>
                                    {/*{row}*/}
									{tdArray}
                                </tbody>
                            </table>
                        </div>
        );
    }
	
	}
    export default MailListContacts;