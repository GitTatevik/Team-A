import React,{Component} from 'react';
import './StyleSheet/Table.css';

class Window extends Component {
    render(){
        return(
          <div className="window" >
              <p className="windowText">{this.props.responseText}</p>
          </div>
        );
    }
}

export default Window;
