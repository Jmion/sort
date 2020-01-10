import "./App.css";
import epfl_logo from "./images/EPFL_logo.png";

import "bootstrap/dist/css/bootstrap.min.css";
import treeEN from "./data/treeEN.json";
import treeFR from "./data/treeFR.json";
import websiteText from "./data/websiteText.json";
import Question from "./Question";
import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const zip = (arr1, arr2) => arr1.map((k, i) => [k, arr2[i]]); // zip function similar to python

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resetCounter: 0, //used to triger rerender when use click back in history. Without cells will not rerender
      lang: "en", //language of the website
      resestCounter: 0, // Used as part of key when generating questions. Needed to retriger render when reset occurs. Key needs to change each time change to question occures
      history: [treeEN],
      currentAwnsers: [],
      previousHistory: [], //Stores the previous history. Allows to undo one history change
      previousAwnsers: []
    };
  }

  /**
   * Returns the language that is not activated
   */
  getNonActiveLanguage = () => {
    switch (this.state.lang) {
      case "en":
        return "fr";
      default:
        return "en";
    }
  };

  /**
   * Changes the language of the website to non active one.
   */
  changeLanguage = () => {
    let lng = this.getNonActiveLanguage();
    this.setState({ lang: lng });
    this.setTreeAccordingToLang(lng);
  };

  /**
   * Switches the tree to the new language.
   *
   * @param  {string} newLanguage New language that we want to switch to. Either FR or EN
   */
  setTreeAccordingToLang = newLanguage => {
    switch (newLanguage) {
      case "fr":
        this.setState(prevState => ({
          previousHistory: prevState.history,
          previousAwnsers: prevState.currentAwnsers,
          currentAwnsers: [],
          history: [treeFR]
        }));
        break;

      default:
        this.setState(prevState => ({
          previousHistory: prevState.history,
          previousAwnsers: prevState.currentAwnsers,
          currentAwnsers: [],
          history: [treeEN]
        }));
        break;
    }
  };

  /**
   * Undo previous history modification. Allows to undo accidental modification to previously awnsered question
   */
  undoHistoryModification = () => {
    if (this.state.previousHistory.length !== 0) {
      this.setState(prevState => ({
        resetCounter: prevState.resestCounter + 1,
        history: prevState.previousHistory,
        currentAwnsers: prevState.previousAwnsers
      }));
    }
  };

  /**
   * Adds to list stored in state the next question to be asked.
   *
   *
   * @param  {string} resp Will either be YES or NO. If YES the user awnsered yes to the previous question.
   * @param  {int} idxOfCaller Unique ID of the caller. Used to determine if we are resetting due to a change in history or adding a new question
   */
  renderNextQuestion = (resp, idxOfCaller) => {
    console.log("IDX received by app is " + JSON.stringify(idxOfCaller));
    console.log(
      "Length of history is " + JSON.stringify(this.state.history.length)
    );
    console.log(
      "CurrentAwnsers is : " + JSON.stringify(this.state.currentAwnsers)
    );
    if (idxOfCaller + 1 !== this.state.history.length) {
      // changing past history
      console.log("RESET REQ DETECTED");
      let sectionOfTreeKeept = this.state.history.slice(0, idxOfCaller + 1);
      this.setState(prevState => ({
        resetCounter: prevState.resestCounter + 1,
        previousHistory: prevState.history,
        history: [
          ...sectionOfTreeKeept,
          resp === "YES"
            ? sectionOfTreeKeept[idxOfCaller].yesBranch
            : sectionOfTreeKeept[idxOfCaller].noBranch
        ],
        previousAwnsers: prevState.currentAwnsers,
        currentAwnsers: [
          ...prevState.currentAwnsers.slice(0, idxOfCaller),
          resp
        ]
      }));
    } else if (
      resp === "YES" &&
      this.state.history[idxOfCaller].isLeaf === "0"
    ) {
      let yesBranch = this.state.history[idxOfCaller].yesBranch;
      this.setState(prevState => ({
        history: [...prevState.history, yesBranch],
        currentAwnsers: [...prevState.currentAwnsers, resp]
      }));
    } else if (
      resp === "NO" &&
      this.state.history[idxOfCaller].isLeaf === "0"
    ) {
      let noBranch = this.state.history[idxOfCaller].noBranch;
      this.setState(prevState => ({
        history: [...prevState.history, noBranch],
        currentAwnsers: [...prevState.currentAwnsers, resp]
      }));
    }
  };

  /**
   * Called to reset the webpage. This is used when we want to restart
   * the sorting task for a new waste. It will remove the awnsers.
   */
  resetWebsite = () => {
    console.log("RESET request");
    this.setState(prevState => ({
      history: [prevState.history[0]],
      resestCounter: prevState.resestCounter + 1,
      currentAwnsers: []
    }));
  };

  /**
   * React function called to render the website. It is within this methode that everything that
   * is displayed is put.
   */
  render() {
    console.log("State of history is :" + this.state.history);
    console.log(this.state.history);
    return (
      <div className="App">
        <Navbar bg="dark" variant="dark" sticky="top">
          <Navbar.Brand>
            <img
              alt=""
              src={epfl_logo}
              height="30"
              className="d-inline-block align-top epflLogo"
            />
            {" " + websiteText[this.state.lang]["title"]}
          </Navbar.Brand>

          <Nav.Link
            className="nav-lang navbar-right "
            onClick={this.undoHistoryModification}
            id="nav_lang"
          >
            {websiteText[this.state.lang]["undo button"]}
          </Nav.Link>

          <Nav.Link
            className="nav-lang ml-auto navbar-right"
            onClick={this.changeLanguage}
            id="nav_lang"
          >
            {this.getNonActiveLanguage()}
          </Nav.Link>
        </Navbar>

        <div className="welcomePage">
          <div
            dangerouslySetInnerHTML={{
              __html: websiteText[this.state.lang]["waringReadInformation"]
            }}
          />
        </div>

        {zip(this.state.history, this.state.currentAwnsers).map(
          (item, index) => (
            <Question
              idx={index}
              key={
                (item[0].isLeaf === "1"
                  ? item[0].information
                  : item[0].question) +
                this.state.resestCounter +
                item[1]
              }
              hist={item[0]}
              lang={this.state.lang}
              currentAwnsers={item[1]}
              onClick={this.renderNextQuestion}
              resetFunction={this.resetWebsite}
            />
          )
        )}
        
        <footer
          dangerouslySetInnerHTML={{
            __html: websiteText[this.state.lang]["footer"]
          }}
        />
      </div>
    );
  }
}

export default App;
