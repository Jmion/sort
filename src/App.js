import ReactDOM from 'react-dom'
import logo from './images/logo/logo.png';
import './App.css';
import epfl_logo from './images/EPFL_logo.png';
import pico_flamable from './images/pictograms/oxidizer.svg';


import 'bootstrap/dist/css/bootstrap.min.css';
import tree from './data/tree.json'
import Question from './Question'
import React, { useEffect, useRef } from 'react'


class App extends React.Component {


  constructor(props){
    super(props);
    this.state = {
      resetCounter: 0, //used to triger rerender when use click back in history. Without cells will not rerender
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
 
  renderNextQuestion = (resp, idxOfCaller) => {
    console.log("IDX received by app is " + JSON.stringify(idxOfCaller))
    console.log("Length of history is "+ JSON.stringify(this.state.history.length))
    if(idxOfCaller+1 != this.state.history.length){
      console.log("RESET REQ DETECTED")
      //let nodeThatChanged = this.state.history[idxOfCaller]
      //let branch = resp == "YES" ? nodeThatChanged.yesBranch : nodeThatChanged.noBranch;
      //this.setState(prevState => ({
      //  history : [...(prevState.history.slice(0,idxOfCaller+1)),branch],
      //  remainingTree: prevState.history.slice(0,idxOfCaller+1)
      //}));
    }
      else if(resp == "YES" && this.state.remainingTree.isLeaf == "0"){ //
        let yesBranch = this.state.remainingTree.yesBranch
          //console.log(this.state.remainingTree);
          //let newHistoryList = this.state.history;
          //console.log(yesBranch);
          //newHistoryList.push(yesBranch);
          this.setState({remainingTree: yesBranch});
          this.setState(prevState => ({
            resetCounter: prevState.resetCounter+1,
            history : [ ...prevState.history,yesBranch]           
          }));
      }
      else if(resp == "NO" && this.state.remainingTree.isLeaf == "0"){
        let noBranch = this.state.remainingTree.noBranch
          //console.log(this.state.remainingTree);
          //let newHistoryList = this.state.history;
          //console.log(noBranch);
          //newHistoryList.push(noBranch);
          this.setState({remainingTree: noBranch});
          this.setState(prevState => ({
            history : [ ...prevState.history,noBranch]           
          }));
      }
      //console.log("State of history is :" +this.state.history)
      //console.log(this.state.history)
  }


  resetWebsite = () =>{
    console.log("RESET request");
    this.setState(prevState => ({
      history : [prevState.history[0]],
      remainingTree: prevState.history[0]
    }));
  }
  


  render(){
    console.log("State of history is :" +this.state.history)
      console.log(this.state.history)
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


      {this.state.history.map((item, index) => (
        <Question idx={index} key={index} hist={item} onClick={this.renderNextQuestion} resetFunction={this.resetWebsite}/>
        ))}

      
      
    </div>
  );
}
}

export default App;