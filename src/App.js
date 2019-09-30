import React from 'react';
import ReactDOM from 'react-dom'
import logo from './images/logo/logo.png';
import './App.css';
import epfl_logo from './images/EPFL_logo.png';

import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import {Navbar ,Nav, NavDropdown} from 'react-bootstrap/Navbar';
import {Form, FormControl} from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import tree from './data/tree.json'
import Question from './Question'


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      questions: [tree.question],
      remainingTree: tree
    }
  }

  componentDidMount() {
    console.log(this.state.questions)
  }

  buttonList = (trig) => {
    this.setState({awnser: trig})
  }

  renderNextQuestion = (resp) => {
    console.log(resp)
      if(resp == "YES"){
        if(this.state.remainingTree.yesBranch.isLeaf == "0"){
          console.log(this.state.remainingTree)
          let newQuestionList = this.state.questions;
          console.log(this.state.remainingTree.yesBranch.question)
          newQuestionList.push(this.state.remainingTree.yesBranch.question)
          let newTree = this.state.remainingTree.yesBranch;
          console.log(newTree)
          this.setState({remainingTree: newTree});
          this.setState({questions: newQuestionList})
        }
      }
      if(resp == "NO"){
        if(this.state.remainingTree.noBranch.isLeaf == "0"){
          console.log(this.state.remainingTree)
          let newQuestionList = this.state.questions;
          console.log(this.state.remainingTree.noBranch);
          newQuestionList.push(this.state.remainingTree.noBranch.question);
          console.log(newQuestionList)
          let newTree = this.state.remainingTree.noBranch;
          this.setState({remainingTree: newTree});
          this.setState({questions: newQuestionList})
        }
      }
      
  }



  render(){
  return (
    <div className="App">

      <header className="App-header">
        <img src={logo} className="App-logo epflLogo" alt="logo"/>
        <p>
          Special waste disposal
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <div className='welcomePage'>
      <p>Please read all the information displayed on the page.</p> <p> Not doing so could lead to a dangerous situation</p>
      </div>
      {this.state.questions.map(item => (
        <Question key={item} question={item} onClick={this.renderNextQuestion}/>
        ))}
      

    </div>
  );
}
}

export default App;