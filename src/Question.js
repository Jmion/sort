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

import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import './App.css';


class Question extends React.Component {

    


    constructor(props){
        super(props);
        //console.log(props)
        this.state = {
          idx: this.props.idx,
          history: this.props.hist,
          onClickAction : this.props.onClick,
          resetWebsiteAction: this.props.resetFunction,
          backgroundColor : ""
        }
      }

    onClickColorChange(response){
        if(response === "YES"){
            this.setState({backgroundColor: "greenAwnser"})
        }else{
            this.setState({backgroundColor: "redAwnser"})
        }
        this.state.onClickAction(response,this.state.idx);
    }

    renderInformationIfRequired(){
        let history = this.state.history;
        if(history.information != ""){
            console.log("Informatio card beaing displayed")
            let html_information = history.information
            return(
                <div className='questionButton' id="infoColor">
                    <p><div dangerouslySetInnerHTML={{ __html: html_information}}/></p>
                </div>
            )
        }
    }

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
            default:
                console.warn("Pictogram requested not found. Value of string was "+img)
                
        }
    }

    renderImageHtml(){
        let history = this.state.history;
        if(history.isLeaf == "0" && history.pictogram != ""){
            let picto = this.imageResolver(history.pictogram);
            return (<Row><Col sm><Image className='image_pictrogram' src={picto} fluid /></Col></Row>);
        }
    }

    render(){
        console.log("idx is : "+JSON.stringify(this.state.idx));
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
                            {this.renderImageHtml()}
                        </Container>
                            
                        <ButtonToolbar>
                            <Button variant="success" id="buttonStyle" onClick={()=> this.onClickColorChange("YES")}>Yes</Button>
                            <Button variant="danger" id="buttonStyle" onClick={() => this.onClickColorChange("NO")}>No</Button>
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
                <Button onClick={() => this.state.resetWebsiteAction()}>Identify a new waste</Button>
            </div>
            );
        }
    }
}

export default Question;
