import React from 'react';
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import './App.css';


class Question extends React.Component {

    


    constructor(props){
        super(props);
        this.state = {
          question: this.props.question,
          onClickAction : this.props.onClick
        }
      }

    render(){
        return(
        <div className='questionButton'>
        <p>{this.state.question}</p>
      <ButtonToolbar>
      <Button variant="success" id="buttonStyle" onClick={()=> this.state.onClickAction("YES")}>Yes</Button>
      <Button variant="danger" id="buttonStyle" onClick={() => this.state.onClickAction("NO")}>No</Button>
      </ButtonToolbar>
      {this.state.awnser}

      </div>
        );
    }
}

export default Question;
