import React from "react";
import corrosion from "./images/pictograms/corrosion.svg";
import environment from "./images/pictograms/environment.svg";
import exclamation_mark from "./images/pictograms/exclamation_mark.svg";
import exploding_bomb from "./images/pictograms/exploding_bomb.svg";
import flamable from "./images/pictograms/flamable.svg";
import gas_cylinder from "./images/pictograms/gas_cylinder.svg";
import health_hazard from "./images/pictograms/health_hazard.svg";
import oxidizer from "./images/pictograms/oxidizer.svg";
import skull from "./images/pictograms/skull.svg";
import radioactive from "./images/pictograms/radioactive.svg";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import combo from "./images/pictograms/combo.svg";
import LabelForm1 from "./labels/LabelForm1";
import LabelForm2 from "./labels/LabelForm2";
import LabelForm3 from "./labels/LabelForm3";
import LabelForm4 from "./labels/LabelForm4";
import LabelForm5 from "./labels/LabelForm5";
import LabelForm6 from "./labels/LabelForm6";
import LabelForm7 from "./labels/LabelForm7";
import LabelForm8 from "./labels/LabelForm8";
import LabelForm9 from "./labels/LabelForm9";
import LabelForm10 from "./labels/LabelForm10";
import LabelForm11 from "./labels/LabelForm11";
import LabelForm12 from "./labels/LabelForm12";
import LabelForm13 from "./labels/LabelForm13";
import LabelForm14 from "./labels/LabelForm14";
import LabelForm15 from "./labels/LabelForm15";
import LabelForm16 from "./labels/LabelForm16";
import LabelForm17 from "./labels/LabelForm17";
import LabelForm18 from "./labels/LabelForm18";
import LabelForm19 from "./labels/LabelForm19";
import LabelFormTest from "./labels/LabelFormTest";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import "./App.css";
import websiteText from "./data/websiteText.json";
import images from "./images/images.json";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      idx: this.props.idx,
      history: this.props.hist,
      onClickAction: this.props.onClick,
      resetWebsiteAction: this.props.resetFunction,
      backgroundColor: "",
      yesButtonColor: "success",
      noButtonColor: "danger",
      lang: this.props.lang,
      currentAwnsers: this.props.currentAwnsers
    };
  }

  /**
   * Scrolls to next question automatically
   */
  componentDidMount() {
    this.setColor(this.state.currentAwnsers);
    window.scrollBy(0, window.screen.availHeight * 0.4);
  }

  /**
   * Will set the background color and change the buttons to reflect the response.
   *
   * @param {string} response either YES or NO. All other strings will be ignored.
   */
  setColor(response) {
    if (response === "YES") {
      this.setState({
        backgroundColor: "greenAwnser",
        noButtonColor: "secondary",
        yesButtonColor: "success"
      });
    } else if (response === "NO") {
      this.setState({
        backgroundColor: "redAwnser",
        yesButtonColor: "secondary",
        noButtonColor: "danger"
      });
    }
  }

  /**
   * Changed to colour and bottons look for this question.
   *
   *
   * @param {string} response YES if user clicked on the yes button NO otherwise
   */
  onClickColorChange(response) {
    this.setState({ currentAwnsers: response });
    if (response !== this.state.currentAwnsers) {
      this.state.onClickAction(response, this.state.idx); // Render next question by informing app.js
      this.setColor(response);
    }
  }

  /**
   * Renders information strip if there is an information strip required from the JSON.
   *
   * Will render an information buble if the string information is not empty.
   */
  renderInformationIfRequired() {
    let history = this.state.history;
    if (history.information !== "") {
      console.log("Informatio card beaing displayed");
      let html_information = history.information;
      return (
        <div className="questionButton" id="infoColor" ref={this.myRef}>
          <p>
            <div dangerouslySetInnerHTML={{ __html: html_information }} />
          </p>
        </div>
      );
    }
  }

  /**
   * Used to identify what picture to display from the string stored in the JSON tree file
   */
  imageResolver(img) {
    switch (img) {
      case "corrosion":
        return corrosion;
      case "environment":
        return environment;
      case "exclamation_mark":
        return exclamation_mark;
      case "exploding_bomb":
        return exploding_bomb;
      case "flamable":
        return flamable;
      case "gas_cylinder":
        return gas_cylinder;
      case "health_hazard":
        return health_hazard;
      case "oxidizer":
        return oxidizer;
      case "skull":
        return skull;
      case "combo":
        return combo;
      case "radioactive":
        return radioactive;
      default:
        console.warn(
          "Pictogram requested not found. Value of string was " + img
        );
    }
  }

  /**
   * Renders the picotgram warning in the question if pictogram field is not empty.
   */
  renderImageHtml() {
    let history = this.state.history;
    if (history.isLeaf === "0" && history.pictogram !== "") {
      let picto = this.imageResolver(history.pictogram);
      return (
        <Row>
          <Col sm>
            <Image className="image_pictrogram" src={picto} fluid />
          </Col>
        </Row>
      );
    }
  }

  /**
   * Method called when rendering moreInformation. Used to add picture if needed to tooltip(poopup)
   */
  popover_image() {
    if (this.state.history.moreInfoPicture !== "") {
      return <Image src={images[this.state.history.moreInfoPicture]} fluid />;
    }
  }

  /**
   * Renders an image if needed for the questions (leaves)
   */
  question_image() {
    if (this.state.history.picture !== "") {
      return (
        <Image
          src={images[this.state.history.picture]}
          fluid
          className="image_question"
        />
      );
    }
  }

  /**
   * Renders the more information button. More information button is only visisble on questions (not leaves).
   * The more information button will only be displayed if there is text deffined for
   */
  renderMoreInformation() {
    let history = this.state.history; //current question that we are on
    if (history.isLeaf === "0" && history.moreInfo !== "") {
      /**
       * Popover object with content rendred
       */
      const popover = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">{history.moreInfoTitle}</Popover.Title>
          <Popover.Content>
            <Container>
              <Row>
                <div dangerouslySetInnerHTML={{ __html: history.moreInfo }} />
              </Row>
              <Row>{this.popover_image()}</Row>
            </Container>
          </Popover.Content>
        </Popover>
      );

      /**
       * Style applied to the render of the more information button
       */
      let infoButtonStyle = {
        marginTop: "10px"
      };

      /**
       * Rendered content to add to page
       */
      return (
        <Row>
          <Col>
            <OverlayTrigger trigger="click" placement="top" overlay={popover}>
              <Button style={infoButtonStyle} variant="dark">
                {websiteText[this.state.lang]["more information"]}
              </Button>
            </OverlayTrigger>
          </Col>
        </Row>
      );
    }
  }

  /**
   * Renders the correct label. Uses the form number to render the correct label
   */
  renderLabel() {
    let history = this.state.history;
    console.log(history);
    switch (history.label) {
      case "1":
        return (
          <LabelForm1
            formNumber={history.label}
            omodCode={history.omod_code}
            language={this.state.lang}
          />
        );
      case "2":
        return (
          <LabelForm2
            formNumber={history.label}
            omodCode={history.omod_code}
            language={this.state.lang}
          />
        );
      case "3":
        return (
          <LabelForm3
            formNumber={history.label}
            omodCode={history.omod_code}
            language={this.state.lang}
          />
        );
      case "4":
        return (
          <LabelForm4
            formNumber={history.label}
            omodCode={history.omod_code}
            language={this.state.lang}
          />
        );
      case "5":
        return (
          <LabelForm5
            formNumber={history.label}
            omodCode={history.omod_code}
            language={this.state.lang}
          />
        );
      case "6":
        return (
          <LabelForm6
            formNumber={history.label}
            omodCode={history.omod_code}
            language={this.state.lang}
          />
        );
      case "7":
        return (
          <LabelForm7
            formNumber={history.label}
            omodCode={history.omod_code}
            language={this.state.lang}
          />
        );
      case "8":
        return (
          <LabelForm8
            formNumber={history.label}
            omodCode={history.omod_code}
            language={this.state.lang}
          />
        );
      case "9":
        return (
          <LabelForm9
            formNumber={history.label}
            omodCode={history.omod_code}
            language={this.state.lang}
          />
        );
      case "10":
        return (
          <LabelForm10
            formNumber={history.label}
            omodCode={history.omod_code}
            language={this.state.lang}
          />
        );
      case "11":
        return (
          <LabelForm11
            formNumber={history.label}
            omodCode={history.omod_code}
            language={this.state.lang}
          />
        );
      case "12":
        return (
          <LabelForm12
            formNumber={history.label}
            omodCode={history.omod_code}
            language={this.state.lang}
          />
        );
      case "13":
        return (
          <LabelForm13
            formNumber={history.label}
            omodCode={history.omod_code}
            language={this.state.lang}
          />
        );
      case "14":
        return (
          <LabelForm14
            formNumber={history.label}
            omodCode={history.omod_code}
            language={this.state.lang}
          />
        );
      case "15":
        return (
          <LabelForm15
            formNumber={history.label}
            omodCode={history.omod_code}
            language={this.state.lang}
          />
        );
      case "16":
        return (
          <LabelForm16
            formNumber={history.label}
            omodCode={history.omod_code}
            language={this.state.lang}
          />
        );
      case "17":
        return (
          <LabelForm17
            formNumber={history.label}
            omodCode={history.omod_code}
            language={this.state.lang}
          />
        );
      case "18":
        return (
          <LabelForm18
            formNumber={history.label}
            omodCode={history.omod_code}
            language={this.state.lang}
          />
        );
      case "19":
        return (
          <LabelForm19
            formNumber={history.label}
            omodCode={history.omod_code}
            language={this.state.lang}
          />
        );
      default:
        console.log("DEFAULT LABEL CASE");
        console.log(history.label);
        break;
    }
  }

  /**
   * Render the sentence at the begining of the form such as:
   * Fill the form bellow or collect label number x (OMoD code xx xx xx) from the assigned responsible person or the assigned waste collection point
   */
  renderSentenceWithOMoDCode() {
    let label_number = this.state.history.label;
    let omod = this.state.history.omod_code;
    if (label_number !== "N/A") {
      if (omod !== "N/A") {
        return (
          <div>
            {
              websiteText[this.state.lang][
                "Fill in the form below or collect label number"
              ]
            }{" "}
            {label_number} {websiteText[this.state.lang]["(OMoD code"]} {omod}){" "}
            {
              websiteText[this.state.lang][
                "from the assigned responsible person or the assigned waste collection point."
              ]
            }{" "}
          </div>
        );
      } else {
        return (
          <div>
            {
              websiteText[this.state.lang][
                "Fill in the form below or collect label number"
              ]
            }{" "}
            {label_number}{" "}
            {
              websiteText[this.state.lang][
                "from the assigned responsible person or the assigned waste collection point."
              ]
            }{" "}
          </div>
        );
      }
    }
    return;
  }

  /**
   * Part of the React life cycle used to render the component to screen.
   */
  render() {
    let history = this.state.history; //Current question that we are working on

    if (history.more_info)
      console.log("idx is : " + JSON.stringify(this.state.idx));
    console.log("current awnsers is " + this.state.currentAwnsers);
    if (history.isLeaf === "0") {
      return (
        <div>
          {this.renderInformationIfRequired()}
          <div className="questionButton" id={this.state.backgroundColor}>
            <Container>
              <Row>
                <Col sm>
                  <div dangerouslySetInnerHTML={{ __html: history.question }} />
                </Col>
              </Row>
              {this.renderMoreInformation()}
              {this.renderImageHtml()}
            </Container>

            <ButtonToolbar>
              <Button
                size="lg"
                variant={this.state.yesButtonColor}
                id="buttonStyle"
                onClick={() => this.onClickColorChange("YES")}
              >
                {websiteText[this.state.lang]["button"]["yes"]}
              </Button>
              <Button
                size="lg"
                variant={this.state.noButtonColor}
                id="buttonStyle"
                onClick={() => this.onClickColorChange("NO")}
              >
                {websiteText[this.state.lang]["button"]["no"]}
              </Button>
            </ButtonToolbar>
          </div>
        </div>
      );
    } else {
      let html_information = history.information;
      return (
        <div>
          <div className="questionButton">
            {this.renderSentenceWithOMoDCode()}
            <div dangerouslySetInnerHTML={{ __html: html_information }} />
            {this.question_image()}
            {this.renderLabel()}
            <p></p>
            <Button onClick={() => this.state.resetWebsiteAction()}>
              {websiteText[this.state.lang]["Identify a new waste"]}
            </Button>
          </div>
        </div>
      );
    }
  }
}

export default Question;
