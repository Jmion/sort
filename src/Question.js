import React from 'react';
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import './App.css';


class Question extends React.Component {

    


    constructor(props){
        super(props);
        console.log(props)
        this.state = {
          history: this.props.hist,
          onClickAction : this.props.onClick,
          backgroundColor : ""
        }
      }

    onClickColorChange(response){
        if(response === "YES"){
            this.setState({backgroundColor: "greenAwnser"})
        }else{
            this.setState({backgroundColor: "redAwnser"})
        }
        this.state.onClickAction(response);
    }

    render(){
        let history = this.state.history;
        console.log(this.state.history);
        if(history.isLeaf=="0"){
            return(
            
        <div className='questionButton' id={this.state.backgroundColor}>
            <p>{this.state.history.question}</p>
            <ButtonToolbar>
            <Button variant="success" id="buttonStyle" onClick={()=> this.onClickColorChange("YES")}>Yes</Button>
            <Button variant="danger" id="buttonStyle" onClick={() => this.onClickColorChange("NO")}>No</Button>
            </ButtonToolbar>
        </div>
            );
        }else{
            let temp = history.information
            return (
            <div className='questionButton'>
            <h2>Information : </h2> <div dangerouslySetInnerHTML={{ __html: temp}}/> 
            <p> omod_code : {history.omod_code}</p>
            <p>label : {history.label}</p>
            </div>
            );
        }
    }
}

export default Question;
