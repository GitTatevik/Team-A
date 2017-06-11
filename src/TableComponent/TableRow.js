import React, { Component } from 'react';
import '../Fetch.js';

class TableRow extends Component {
	constructor(props) {
		super(props);
		this.checkBoxOnChange = this.checkBoxOnChange.bind(this);

	}

	checkBoxOnChange(event) {
		this.props.checkBoxChanges(event.target);
		let index = event.target.id;
		if (event.target.checked === true) {
			this.props.guids.push(this.props.dataArray[index].Guid);

		} else {
			for (let i = 0; i < this.props.guids.length; ++i) {

				if (this.props.dataArray[index].Guid === this.props.guids[i]) {
					this.props.guids.splice(i, 1);

				}

			}
		}
		if (this.props.guids.length === 0) {
			this.props.isdisabledprop(true);
		} else {
			this.props.isdisabledprop(false);
		}
	}

	     render(){
		     const data=this.props.dataArray
		      const row = data.map((data,index)=>
		     	<tr key={index} ref={index}>
					 <td key={index} id="checkbox">
						 <input type="checkbox" ref={index} id={index} onChange ={this.checkBoxOnChange }  />
					 </td>
			     	<td key={data["Full Name"]}>
				     	{data["Full Name"]}
			     	</td>
			     	<td key={["Company Name"]}>
				     	{data["Company Name"]}
				     </td>
					  <td key={data.Position}>
			     	    {data.Position}
			     	</td>
			     	<td key= {data.Country}>
			     	    {data.Country}
			     	</td>
			     	<td key={data.Email}>
			     	    {data.Email}
			     	</td>

			     	<td id="pencil" className="edit">
						<i className="glyphicon glyphicon-pencil change" id ={index} onClick={this.props.editBtn} /></td>
		     	</tr>
		     	);
		     	return(
		     		<tbody>
		     			{row}
					</tbody>
		     	);
	     }
	}
    export default TableRow;
