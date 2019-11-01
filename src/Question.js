import React from 'react';
import corrosion from './images/pictograms/corrosion.svg'
import environment from './images/pictograms/environment.svg'
import exclamation_mark from './images/pictograms/exclamation_mark.svg'
import exploding_bomb from './images/pictograms/exploding_bomb.svg'
import flamable from './images/pictograms/flamable.svg'
import gas_cylinder from './images/pictograms/gas_cylinder.svg'
import health_hazard from './images/pictograms/health_hazard.svg'
import oxidizer from './images/pictograms/oxidizer.svg'
import skull from './images/pictograms/skull.svg'
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import combo from './images/pictograms/combo.svg'

import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import './App.css';
import websiteText from './data/websiteText.json'
import Popover from 'react-bootstrap/Popover'
import Overlay from 'react-bootstrap/Overlay'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'


class Question extends React.Component {

    


    constructor(props){
        super(props);
        this.myRef = React.createRef();
        this.state = {
          idx: this.props.idx,
          history: this.props.hist,
          onClickAction : this.props.onClick,
          resetWebsiteAction: this.props.resetFunction,
          backgroundColor : "",
          yesButtonColor: 'success',
          noButtonColor: 'danger',
          lang: this.props.lang,
          currentAwnsers : this.props.currentAwnsers
        }
      }


      /**
       * Scrolls to next question automatically
       */
      componentDidMount() {
        this.setColor(this.state.currentAwnsers);
        const height = this.myRef.clientHeight;
        console.log(height)
        window.scrollBy(0,1000);
      } 


      /**
       * Will set the background color and change the buttons to reflect the response.
       * 
       * @param {string} response either YES or NO. All other strings will be ignored.
       */
      setColor(response){
        if(response === "YES"){
            this.setState({
                backgroundColor: "greenAwnser",
                noButtonColor: 'secondary',
                yesButtonColor: 'success'
        })
        }else if(response === "NO"){
            this.setState({
                backgroundColor: "redAwnser",
                yesButtonColor:'secondary',
                noButtonColor: 'danger'
            })
        }
      }

      /**
       * Changed to colour and bottons look for this question.
       * 
       * 
       * @param {string} response YES if user clicked on the yes button NO otherwise
       */
    onClickColorChange(response){
        this.setState({currentAwnsers : response})
        if(response != this.state.currentAwnsers){
            this.state.onClickAction(response,this.state.idx);
            this.setColor(response)
        }

        
    }

    /**
     * Renders information strip if there is an information strip required from the JSON.
     * 
     * Will render an information buble if the string information is not empty.
     */
    renderInformationIfRequired(){
        let history = this.state.history;
        if(history.information != ""){
            console.log("Informatio card beaing displayed")
            let html_information = history.information
            return(
                <div className='questionButton' id="infoColor" ref={this.myRef}>
                    <p><div dangerouslySetInnerHTML={{ __html: html_information}}/></p>
                </div>
            )
        }
    }

    /**
     * Used to identify what picture to display from the string stored in the JSON tree file
     */
    imageResolver(img){
        switch(img){
            case "corrosion" : 
                return corrosion;
            case "environment" : 
                return environment;
            case "exclamation_mark" :
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
            default:
                console.warn("Pictogram requested not found. Value of string was "+img)
                
        }
    }

    /**
     * Renders the picotgram warning in the question if pictogram field is not empty.
     */
    renderImageHtml(){
        let history = this.state.history;
        if(history.isLeaf == "0" && history.pictogram != ""){
            let picto = this.imageResolver(history.pictogram);
            return (<Row><Col sm><Image className='image_pictrogram' src={picto} fluid /></Col></Row>);
        }
    }

    

    /**
     * Part of the React life cycle used to render the component to screen.
     */
    render(){

        const popover = (
            <Popover id="popover-basic">
              <Popover.Title as="h3">Popover right</Popover.Title>
              <Popover.Content>
                And here's some <strong>amazing</strong> content. It's very engaging.
                right?
              </Popover.Content>
            </Popover>
          );


        console.log("idx is : "+JSON.stringify(this.state.idx));
        console.log("current awnsers is "+ this.state.currentAwnsers)
        let history = this.state.history;
        if(history.isLeaf=="0"){
            let html_question = history.question
            return(
                <div>
                    {this.renderInformationIfRequired()}
                    <div className='questionButton' id={this.state.backgroundColor}>
                        <Container>
                            <Row>
                                <Col sm><div dangerouslySetInnerHTML={{ __html: html_question}}/></Col>
                            </Row>
                            <Row>
                                <Col>
                                <OverlayTrigger trigger="click" placement="below" overlay={popover}>
                                    <Button variant="dark">{websiteText[this.state.lang]["more information"]}</Button>
                                </OverlayTrigger>
                                </Col>
                            </Row>
                            {this.renderImageHtml()}
                        </Container>
                            
                        <ButtonToolbar>
                            <Button size="lg" variant={this.state.yesButtonColor} id="buttonStyle" onClick={()=> this.onClickColorChange("YES")}>{websiteText[this.state.lang]['button']['yes']}</Button>
                            <Button size="lg" variant={this.state.noButtonColor} id="buttonStyle" onClick={() => this.onClickColorChange("NO")}>{websiteText[this.state.lang]['button']['no']}</Button>
                        </ButtonToolbar>
                    </div>
                </div>
            );
        }else{
            let html_information = history.information
            return (
            <div className='questionButton'>
                <h2>Information : </h2> <div dangerouslySetInnerHTML={{ __html: html_information}}/> 
                <p> omod_code : {history.omod_code}</p>
                <p>label : {history.label}</p>
                <Button onClick={() => this.state.resetWebsiteAction()}>{websiteText[this.state.lang]["Identify a new waste"]}</Button>
            </div>
            );
        }
    }
}

export default Question;
