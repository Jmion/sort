import ReactDOM from 'react-dom'
import logo from './images/logo/logo_transparent512.png';
import './App.css';
import epfl_logo from './images/EPFL_logo.png';
import pico_flamable from './images/pictograms/oxidizer.svg';


import 'bootstrap/dist/css/bootstrap.min.css';
import treeEN from './data/treeEN.json'
import treeFR from './data/treeFR.json'
import websiteText from './data/websiteText.json'
import Question from './Question'
import React, { useEffect, useRef } from 'react'
import { HotKeys } from "react-hotkeys";
import { getApplicationKeyMap } from 'react-hotkeys';
import LanguageRounded from "@bit/mui-org.material-ui-icons.language-rounded";
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      resetCounter: 0, //used to triger rerender when use click back in history. Without cells will not rerender
      history: [treeEN],
      shortcut: false, // used to button awnser. 
      lang: 'en',
      resestCounter: 0, // Used as part of key when generating questions. Needed to retriger render when reset occurs. Key needs to change each time change to question occures
      previousHistory: [] //Stores the previous history. Allows to undo one history change
    }
  }


  /**
   * Returns the language that is not activated
   */
  getNonActiveLanguage = ()=>{
    switch (this.state.lang) {
      case "en":
        return 'fr';  
      default:
        return 'en'
    }
  }

  /**
   * Changes the language of the website to non active one. 
   */
  changeLanguage = () => {
    let lng = this.getNonActiveLanguage()
    this.setState(({lang: lng}))
    this.setTreeAccordingToLang(lng)
  }

  /**
   * Switches the tree to the new language.
   * 
   * @param  {string} newLanguage New language that we want to switch to. Either FR or EN
   */
  setTreeAccordingToLang = (newLanguage) => {
    switch (newLanguage) {
      case 'fr':
        this.setState({
          history: [treeFR],
        })
        break;
    
      default:
          this.setState({
            history: [treeEN],
          })
        break;
    }
  }

 
 
  
  /**
   * Adds to list stored in state the next question to be asked.
   * 
   * 
   * @param  {string} resp Will either be YES or NO. If YES the user awnsered yes to the previous question.
   * @param  {int} idxOfCaller Unique ID of the caller. Used to determine if we are resetting due to a change in history or adding a new question
   */
  renderNextQuestion = (resp, idxOfCaller) => {
    console.log("IDX received by app is " + JSON.stringify(idxOfCaller))
    console.log("Length of history is "+ JSON.stringify(this.state.history.length))
    if(idxOfCaller + 1 != this.state.history.length){
      
      console.log("RESET REQ DETECTED")
      let sectionOfTreeKeept = this.state.history.slice(0,idxOfCaller + 1)
      this.setState(prevState => ({
        resetCounter : prevState.resestCounter + 1,
        previousHistory : prevState.history,
        history : [ ...sectionOfTreeKeept, resp == "YES" ? 
        sectionOfTreeKeept[idxOfCaller].yesBranch 
        : sectionOfTreeKeept[idxOfCaller].noBranch],
      }));
    }
      else if(resp == "YES" && this.state.history[idxOfCaller].isLeaf == "0"){ 
        let yesBranch = this.state.history[idxOfCaller].yesBranch
          this.setState(prevState => ({
            history : [ ...prevState.history, yesBranch]           
          }));
      }
      else if(resp == "NO" && this.state.history[idxOfCaller].isLeaf == "0"){
        let noBranch = this.state.history[idxOfCaller].noBranch
          this.setState(prevState => ({
            history : [ ...prevState.history, noBranch]           
          }));
      }
  }


  /**
   * Called to reset the webpage. This is used when we want to restart 
   * the sorting task for a new waste. It will remove the awnsers.
   */
  resetWebsite = () =>{
    console.log("RESET request");
    this.setState(prevState => ({
      history : [prevState.history[0]],
      resestCounter : prevState.resestCounter + 1
    }));
  }


/**
 * React function called to render the website. It is within this methode that everything that 
 * is displayed is put.
 */
  render(){
    console.log("State of history is :" +this.state.history)
      console.log(this.state.history)
  return (
    <div className="App">
            <h1>For demonstration purposes only. Not to be used to sort waste!</h1>

       <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            {' ' + websiteText[this.state.lang]['title']}
          </Navbar.Brand>
        <Nav.Link className='nav-lang ml-auto' onClick={this.changeLanguage} id='nav_lang'>{this.getNonActiveLanguage()}</Nav.Link>

        </Navbar>



      <div className='welcomePage'>
      <div dangerouslySetInnerHTML={{ __html: websiteText[this.state.lang]['waringReadInformation']}}/>
      </div>


      {this.state.history.map((item, index) => (
        <Question idx={index} key={(item.isLeaf == "1" ? item.information : item.question)+ this.state.resestCounter} hist={item} lang={this.state.lang} onClick={this.renderNextQuestion} resetFunction={this.resetWebsite}/>
        ))}

        <div className='footer'dangerouslySetInnerHTML={{ __html: websiteText[this.state.lang]['footer']}}/>

    </div>
  );
}
}

/*
      <header className="App-header">
        <img src={logo} className="App-logo epflLogo" alt="logo"/>
        <p>
          Special waste disposal
        </p>
      </header>
      */

export default App;