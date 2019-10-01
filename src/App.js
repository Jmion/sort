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
import React, { useEffect, useRef } from 'react'


class App extends React.Component {


  constructor(props){
    super(props);
    this.state = {
      history: [tree],
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
      if(resp == "YES" && this.state.remainingTree.isLeaf == "0"){
        let yesBranch = this.state.remainingTree.yesBranch
          console.log(this.state.remainingTree);
          let newHistoryList = this.state.history;
          console.log(yesBranch);
          newHistoryList.push(yesBranch);
          this.setState({remainingTree: yesBranch});
          this.setState({questions: newHistoryList})
        
      }
      if(resp == "NO" && this.state.remainingTree.isLeaf == "0"){
        let yesBranch = this.state.remainingTree.noBranch
          console.log(this.state.remainingTree);
          let newHistoryList = this.state.history;
          console.log(yesBranch);
          newHistoryList.push(yesBranch);
          this.setState({remainingTree: yesBranch});
          this.setState({questions: newHistoryList})
        
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
      </header>

      <div className='welcomePage'>
      <p>Please read all the information displayed on the page.</p> <p> Not doing so could lead to a dangerous situation</p>
      </div>

      {this.state.history.map(item => (
        <Question key={item} hist={item} onClick={this.renderNextQuestion}/>
        ))}
      
    </div>
  );
}
}

export default App;