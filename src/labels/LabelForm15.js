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
import labelText from '../data/labelText.json'


import jsPDF from 'jspdf' //doc from https://raw.githack.com/MrRio/jsPDF/master/docs/   Project from: https://github.com/MrRio/jsPDF
import labels from '../images/labels/labels.json'
import pictograms from '../images/labels/picotrgram.json' //base64 encoded https://www.base64-image.de/

import "./LabelForm.css"
import Container from 'react-bootstrap/Container';


class LabelForm15 extends React.Component {


    constructor(props){
        super(props);
        this.myRef = React.createRef();
        this.state = {
            formNumber: this.props.formNumber,
            omodCode: this.props.omodCode,
            language: this.props.language
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
           doc.addImage(labels[4], 'JPEG', 0,0, 297,210)
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

            <p>
            <Form.Label>{labelText[this.state.language]["You do not need to enter any extra information. Please generate your label bellow."]}</Form.Label>    
            </p>
            <Button type="submit" variant="primary"> {labelText[this.state.language]['generate pdf']}</Button>
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

export default LabelForm15;