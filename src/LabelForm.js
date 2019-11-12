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
import radioactive from './images/pictograms/radioactive.svg'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl'
import FormCheck from 'react-bootstrap/FormCheck'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import "./LabelForm.css"


class LabelForm extends React.Component {


    constructor(props){
        super(props);
        this.myRef = React.createRef();
        this.state = {
            formNumber: this.props.formNumber,
            omodCode: this.props.omodCode,
        }
    }

    render(){
        return(
        <Form className="LabelFormLayout">

        <Form.Group as={Row} controlId="formPlaintextOmodCode">
            <Form.Label column sm="2">
            OMoD Code : 
            </Form.Label>
            <Col sm="10">
            <Form.Control plaintext readOnly defaultValue={this.state.omodCode} />
            </Col>
        </Form.Group>
                
        <Form.Group controlId= "formGroupName">
            <Form.Row>
                <Col>
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                    required
                    placeholder="First name"
                    type="text"/>
                <Form.Control.Feedback type = "valid">Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type = "invalid">We need to know you</Form.Control.Feedback>
                </Col>
                <Col>
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                    required
                    placeholder = "First name"
                    type = "text"/>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Col>
            </Form.Row>
            <Form.Row>
                <Form.Label>Group name</Form.Label>
                <Form.Control
                required
                placeholder = "Group name"
                type = "text" />
            </Form.Row>
        </Form.Group>

        <Form.Group controlId = "formRemettant">
            <Form.Row>
                <Form.Label>Remettant</Form.Label>
                <Form.Control
                    required
                    placeholder = "Remettant"
                    type = "text" />
            </Form.Row>
        </Form.Group>


          
            
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>)
    }
}
export default LabelForm;