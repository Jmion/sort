import React from 'react';
import corrosion from '../images/pictograms/corrosion.svg'
import environment from '../images/pictograms/environment.svg'
import exclamation_mark from '../images/pictograms/exclamation_mark.svg'
import exploding_bomb from '../images/pictograms/exploding_bomb.svg'
import flamable from '../images/pictograms/flamable.svg'
import gas_cylinder from '../images/pictograms/gas_cylinder.svg'
import health_hazard from '../images/pictograms/health_hazard.svg'
import oxidizer from '../images/pictograms/oxidizer.svg'
import skull from '../images/pictograms/skull.svg'
import radioactive from '../images/pictograms/radioactive.svg'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl'
import FormCheck from 'react-bootstrap/FormCheck'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'

import jsPDF from 'jspdf' //doc from https://raw.githack.com/MrRio/jsPDF/master/docs/   Project from: https://github.com/MrRio/jsPDF
import labels from '../images/labels/labels.json'
import pictograms from '../images/labels/picotrgram.json' //base64 encoded https://www.base64-image.de/

import "./LabelForm.css"
import Container from 'react-bootstrap/Container';


class LabelForm1 extends React.Component {


    constructor(props){
        super(props);
        this.myRef = React.createRef();
        this.state = {
            formNumber: this.props.formNumber,
            omodCode: this.props.omodCode,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    jsPdfGenerator = (data) => {
        var options = {
            orientation: 'l',
            unit: 'mm',
            format: 'a4',
            putOnlyUsedFonts:true
           }
           
           // creating the document
           var doc = new jsPDF(options);

           // adiing some text
           doc.addImage(labels[3], 'JPEG', 0, 0, 297, 210)


           //OMoD
           doc.setFont('arial')
           doc.setFontType("bold")
           doc.setFontSize(16)
           doc.text(115,40,data.get("omod"))
           
           doc.setFontSize(10)
           doc.setFontType("normal")
           // Remettant
           doc.text(90, 10.5, data.get("remettant"))

           // Group
           doc.text(6, 50, data.get("group name"),{maxWidth: 15})

           // Name
           doc.text(6, 75, data.get("first name") + " " + data.get("last name"), {maxWidth: 15})

           // date
           doc.text(6, 103, data.get("date"))

           //other comments
           doc.setFontSize(10)
           doc.setFontType('normal')
           doc.text(35, 98.3, data.get("pH").toString())
           doc.text(106, 98.3, data.get("metal"), {maxWidth: 40})

           const pictograms_keys = ["corrosion", "environment", "exclamation_mark", "exploding_bomb", "flamable", "gas_cylinder",
        "health_hazard", "oxidizer", "radioactive", "skull"]

           const pictograms_location = [10, 15, 22, 15, 34, 15, 46, 15, 16, 21, 28, 21, 40, 21, 22, 27, 34, 27, 28, 33]
           var nbPicto = 0
           for( var i = 0; i < pictograms_keys.length; i++){
               var picto_check = data.get(pictograms_keys[i])
               if(picto_check != null){
                   doc.addImage(pictograms[pictograms_keys[i]], pictograms_location[nbPicto*2], pictograms_location[nbPicto*2 + 1], 10, 10)
                   nbPicto++
               }
           }

           doc.save("label.pdf")
           
    }
   
    handleSubmit(event)  {
        event.preventDefault();
        console.log("handling submit")
        const data = new FormData(event.target);
        console.log(stringifyFormData(data))
        console.log(data.get("radioactive") != null)
        console.log(data.get("omod"))
        this.jsPdfGenerator(data)
    }

    render(){
        var date = new Date();
        var picto = radioactive
        return(
            <div>
        <Form className="LabelFormLayout" onSubmit={this.handleSubmit}>

        <Form.Group as={Row} controlId="formPlaintextOmodCode">
            <Form.Label column sm="2">
            OMoD Code:
            </Form.Label>
            <Col sm="10">
            <Form.Control plaintext name="omod" readOnly defaultValue={this.state.omodCode} />
            </Col>
            <Form.Label column sm="2">
            Date:
            </Form.Label>
            <Col sm="10">
            <Form.Control plaintext name="date" readOnly defaultValue={date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()} />
            </Col>
        </Form.Group>
                
        <Form.Group controlId= "formGroupName">
            <Form.Row>
                <Col>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    defaultValue = "Jeremy" 
                    required
                    name = "first name"
                    placeholder="First name"
                    type="text"/>
                <Form.Control.Feedback type = "valid">Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type = "invalid">We need to know you</Form.Control.Feedback>
                </Col>
                <Col>
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                    defaultValue = "Mion"
                    required
                    name = "last name"
                    placeholder = "Last name"
                    type = "text"/>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Col>
            </Form.Row>
            <Form.Row>
                <Form.Label>Group name</Form.Label>
                <Form.Control
                required
                defaultValue = "Test team"
                name = "group name"
                placeholder = "Group name"
                type = "text" />
            </Form.Row>
        </Form.Group>

        <Form.Group controlId = "formRemettant">
            <Form.Row>
                <Form.Label>Remettant</Form.Label>
                <Form.Control
                    required
                    defaultValue = "ISIC-CH/PH-1015 Lausanne"
                    name = "remettant"
                    placeholder = "Remettant"
                    type = "text" />
            </Form.Row>
        </Form.Group>

        <Form.Group controlId = "formMetalPh">
            <Form.Row>
                <Col>
                <Form.Label>Métaux</Form.Label>
                <Form.Control
                    required
                    defaultValue = "Cuivre"
                    name = "metal"
                    placeholder = "metal"
                    type = "text" />
                </Col>
                <Col>
                    <Form.Label>pH</Form.Label>
                    <Form.Control
                    required
                    defaultValue = "9"
                    name = "pH"
                    placeholder = "pH"
                    type = "float" />
                    </Col>
            </Form.Row>
        </Form.Group>

        <Container>
            <Form.Label>Desinfectant utilisée/ used:</Form.Label>
            <Row>
                <Col>
                    <Form.Check
                        custom
                        className="pictogramMargin"
                        name = "javel"
                        label = "eau de Javel 10%"
                        type = "checkbox"
                        id={"javel"} />
                </Col>
                <Col>
                    <Form.Check
                        custom
                        name = "virkon"
                        label = "Virkon"
                        type = "checkbox"
                        id={"virkon"} />
                </Col>
                <Col>
                    <Form.Check
                        custom
                        name = "autre"
                        label = "autre"
                        type = "checkbox"
                        id={"autre"} />
                </Col>
            </Row>
        </Container>
            
      
        
        <Container>
            <Form.Label>Danger pictograms</Form.Label>
            <Row>
                <Col>
            <Form.Check
                custom
                className="pictogramMargin"
                name = "corrosion"
                label={<Image className='image_checkbox' src={corrosion} fluid />}
                type="checkbox"
                id={`corrosion`}
            />
            </Col>
            <Col>
            <Form.Check
                custom
                name = "environment"
                label={<Image className='image_checkbox' src={environment} fluid />}
                type="checkbox"
                id={`environment`}
            />
            </Col>
            <Col>
            <Form.Check
                custom
                name = "exclamation_mark"
                label={<Image className='image_checkbox' src={exclamation_mark} fluid />}
                type="checkbox"
                id={`exclamation_mark`}
            />
            </Col>
            <Col>
            <Form.Check
                custom
                name = "exploding_bomb"
                label={<Image className='image_checkbox' src={exploding_bomb} fluid />}
                type="checkbox"
                id={`exploding_bomb`}
            />
            </Col>
            <Col>
            <Form.Check
                custom
                name = "flamable"
                label={<Image className='image_checkbox' src={flamable} fluid />}
                type="checkbox"
                id={`flamable`}
            />
            </Col>
            </Row>
            <Row>
            <Col>
            <Form.Check
                className="pictogramMargin"
                custom
                name = "gas_cylinder"
                label={<Image className='image_checkbox' src={gas_cylinder} fluid />}
                type="checkbox"
                id={`gas_cylinder`}
            />
            </Col>
                <Col>
            <Form.Check
                custom
                name = "health_hazard"
                label={<Image className='image_checkbox' src={health_hazard} fluid />}
                type="checkbox"
                id={`health_hazard`}
            />
            </Col>
            <Col>
            <Form.Check
                custom
                name = "oxidizer"
                label={<Image className='image_checkbox' src={oxidizer} fluid />}
                type="checkbox"
                id={`oxidizer`}
            />
            </Col>
            <Col>
            <Form.Check
                custom
                name = "radioactive"
                label={<Image className='image_checkbox' src={radioactive} fluid />}
                type="checkbox"
                id={`radioactive`}
            />
            </Col>
            <Col>
            <Form.Check
                custom
                name = "skull"
                label={<Image className='image_checkbox' src={skull} fluid />}
                type="checkbox"
                id={`skull`}
            />
            </Col>
            </Row>
            </Container>
            
            <Button type="submit" variant="primary"> Submit</Button>

          </Form>




          </div>
          )
    }
}


function stringifyFormData(fd) {
    const data = {};
      for (let key of fd.keys()) {
        data[key] = fd.get(key);
    }
    return JSON.stringify(data, null, 2);
}

export default LabelForm1;