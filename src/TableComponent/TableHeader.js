import React,{Component} from 'react';

class TableHeader extends Component{
	constructor(props){
	super(props);
	this.selectAll = this.selectAll.bind(this);
	}
	 selectAll(event){
		 this.props.selectAll(event.target.checked);
		 console.log("cherevac");
	 }
		 
		 render(){

		 const obj=this.props.headerdata;
		 let headers =[];
			  for(let i in obj){
			  		headers.push(i);
			  }
			  headers = headers.slice(0, 5);
		  //console.log("TableHeader Data :",headers);
		  let header = headers.map((headers,index)=>
		  	<th key={index}>{headers}</th>

		  );
		  
		 
		 	return(
		 <thead>
		 	<tr >
				 <th> 
				 Select All
				 <input onChange={this.selectAll}type="checkbox" />
				 </th>
		 		{header}
		 		
		 	</tr>
		 </thead>
		 	);
		 }
	}
    export default TableHeader;