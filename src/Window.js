import React,{Component} from 'react';
import './StyleSheet/Table.css';


class Window extends Component {
    render(){
        return(
          <div className="window" style={{opacity:'1'}}>
              <p className="windowText">{this.props.responseText}</p>
          </div>
        );
    }
}

export default Window;
