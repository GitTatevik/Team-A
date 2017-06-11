import React,{Component} from 'react';
import './StyleSheet/Table.css';

<<<<<<< HEAD
class Window extends Component {
=======
export default class Window extends Component {
>>>>>>> 48acb940f43b7c98dc05cc5e9d7c4d8306667d7d
    render(){
        return(
          <div className="window" >
              <p className="windowText">{this.props.responseText}</p>
          </div>
        );
    }
}
