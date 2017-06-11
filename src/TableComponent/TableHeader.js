import React,{Component} from 'react';
import '../StyleSheet/Table.css';

class TableHeader extends Component{
		 render(){
		 const obj=this.props.headerdata;
		 let headers =[];
			  for(let i in obj){
			  		headers.push(i);
			  }
			let header=  headers.splice(0,5);

         let head= header.map((headers,index)=>
				 <th key={index}>{headers}</th>);
		 	return(
		 <thead>
		 	<tr >
				<th>Select</th>
                 {head}
				 <th>Edit</th>
		 	</tr>
		 </thead>
		 	);
		 }
	}
    export default TableHeader;
