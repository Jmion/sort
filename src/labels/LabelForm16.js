import React from "react";
import radioactive from "../images/pictograms/radioactive.svg";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import FormCheck from "react-bootstrap/FormCheck";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import labelText from "../data/labelText.json";
import labelSettings from "../data/labelSettings.json";
import DangerPictogramCheckbox from "./DangerPictogramCheckbox";
import calculatePictoSize from "./Helper.js";

import jsPDF from "jspdf"; //doc from https://raw.githack.com/MrRio/jsPDF/master/docs/   Project from: https://github.com/MrRio/jsPDF
import labels from "../images/labels/labels.json";
import pictograms from "../images/labels/picotrgram.json"; //base64 encoded https://www.base64-image.de/

import "./LabelForm.css";
import Container from "react-bootstrap/Container";

class LabelForm16 extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      formNumber: this.props.formNumber,
      omodCode: this.props.omodCode,
      language: this.props.language
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  jsPdfGenerator = data => {
    var options = {
      orientation: "l",
      unit: "mm",
      format: "a4",
      putOnlyUsedFonts: true
    };

    // creating the document
    var doc = new jsPDF(options);

    // adiing some text
    doc.addImage(labels[16], "JPEG", 0, 0, 297, 210);

    //OMoD
    doc.setFont("arial");
    doc.setFontType("bold");
    doc.setFontSize(16);
    doc.text(115, 40.3, data.get("omod"));

    doc.setFontSize(10);
    doc.setFontType("normal");
    // Remettant
    doc.text(90, 10.5, data.get("remettant"));

    // Group
    doc.text(6, 50, data.get("group name"), { maxWidth: 15 });

    // Name
    doc.text(6, 70, data.get("first name") + " " + data.get("last name"), {
      maxWidth: 15
    });

    // date
    doc.text(6, 103, data.get("date"));

    //other comments
    doc.setFontSize(10);
    doc.setFontType("normal");
    doc.text(27, 69, data.get("chemical substances"), { maxWidth: 70 });
    doc.text(27, 81, data.get("material"), { maxWidth: 70 });
    doc.text(27.5, 99, data.get("other comment"), { maxWidth: 70 });

    // Check box
    const x_location = [27.5, 71.48, 91.2];
    const x_labels = ["absorbentNeo", "sulphur", "other"];
    doc.setFontType("bold");
    for (var i = 0; i < x_labels.length; i++) {
      if (data.get(x_labels[i]) != null) {
        doc.text(x_location[i], 94.1, "X");
      }
    }

    const pictograms_keys = Object.keys(pictograms);

    var nbPicto = 0;
    let pictograms_to_display = [];
    for (i = 0; i < pictograms_keys.length; i++) {
      if (data.get(pictograms_keys[i]) != null) {
        nbPicto++;
        pictograms_to_display.push(pictograms_keys[i]);
      }
    }

    let pictogramPlacement = calculatePictoSize(60, 29, nbPicto);
    console.log(pictograms_to_display);
    console.log(pictogramPlacement);
    for (i = 0; i < pictogramPlacement[0]; i++) {
      for (var j = 0; j < pictogramPlacement[1]; j++) {
        if (pictogramPlacement[1] * i + j < pictograms_to_display.length) {
          console.log(pictogramPlacement[1] * i + j);
          doc.addImage(
            pictograms[pictograms_to_display[pictogramPlacement[1] * i + j]],
            5 + pictogramPlacement[2] * j,
            13 + pictogramPlacement[2] * i,
            pictogramPlacement[2],
            pictogramPlacement[2]
          );
        }
      }
    }

    doc.save("label.pdf");
  };

  handleSubmit(event) {
    event.preventDefault();
    console.log("handling submit");
    const data = new FormData(event.target);
    console.log(stringifyFormData(data));
    console.log(data.get("radioactive") != null);
    console.log(data.get("omod"));
    this.jsPdfGenerator(data);
  }

  render() {
    var date = new Date();
    var picto = radioactive;
    return (
      <div>
        <Form className="LabelFormLayout" onSubmit={this.handleSubmit}>
          <Form.Group as={Row} controlId="formPlaintextOmodCode">
            <Form.Label column sm="2">
              {labelText[this.state.language]["omod code"]}
            </Form.Label>
            <Col sm="10">
              <Form.Control
                plaintext
                name="omod"
                readOnly
                defaultValue={this.state.omodCode}
                id="fixFormValue"
              />
            </Col>
            <Form.Label column sm="2">
              Date:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                plaintext
                name="date"
                readOnly
                defaultValue={
                  date.getDate() +
                  "/" +
                  (date.getMonth() + 1) +
                  "/" +
                  date.getFullYear()
                }
                id="fixFormValue"
              />
            </Col>
          </Form.Group>

          <Form.Group controlId="formGroupName">
            <Form.Row>
              <Col>
                <Form.Label>
                  {labelText[this.state.language]["first name"]}
                </Form.Label>
                <Form.Control
                  required
                  name="first name"
                  placeholder={
                    labelText[this.state.language]["first name placeholder"]
                  }
                  type="text"
                />
              </Col>
              <Col>
                <Form.Label>
                  {labelText[this.state.language]["last name"]}
                </Form.Label>
                <Form.Control
                  required
                  name="last name"
                  placeholder={
                    labelText[this.state.language]["last name placeholder"]
                  }
                  type="text"
                />
              </Col>
            </Form.Row>
            <Form.Row>
              <Form.Label>
                {labelText[this.state.language]["group name"]}
              </Form.Label>
              <Form.Control
                required
                name="group name"
                placeholder={
                  labelText[this.state.language]["group name placeholder"]
                }
                type="text"
              />
            </Form.Row>
          </Form.Group>

          <Form.Group controlId="formRemettant">
            <Form.Row>
              <Form.Label>
                {labelText[this.state.language]["remettant"]}
              </Form.Label>
              <Form.Control
                required
                name="remettant"
                placeholder={
                  labelText[this.state.language]["remettant placeholder"]
                }
                type="text"
              />
            </Form.Row>
          </Form.Group>

          <Form.Group controlId="chemical substances">
            <Form.Label>
              {labelText[this.state.language]["chemical substances"]}
            </Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              required
              name="chemical substances"
            />
          </Form.Group>

          <Form.Group controlId="material">
            <Form.Label>
              {labelText[this.state.language]["materials"]}
            </Form.Label>
            <Form.Control as="textarea" rows="3" required name="material" />
          </Form.Group>

          <Container>
            <Form.Label>
              {labelText[this.state.language]["absorbant used"]}
            </Form.Label>
            <Row>
              <Col>
                <Form.Check
                  custom
                  className="checkbox_margin"
                  name="absorbentNeo"
                  label={labelText[this.state.language]["absorbant Nétosol"]}
                  type="checkbox"
                  id={"absorbentNeo"}
                />
              </Col>
              <Col>
                <Form.Check
                  custom
                  className="checkbox_margin"
                  name="sulphur"
                  label={labelText[this.state.language]["sulphur"]}
                  type="checkbox"
                  id={"sulphur"}
                />
              </Col>
              <Col>
                <Form.Check
                  custom
                  className="checkbox_margin"
                  name="other"
                  label={labelText[this.state.language]["other"]}
                  type="checkbox"
                  id={"autre"}
                />
              </Col>
            </Row>
            <Row>
              <Form.Label>
                {
                  labelText[this.state.language][
                    "If other is selected please specify"
                  ]
                }
              </Form.Label>
              <Form.Control
                required
                name="other comment"
                placeholder={
                  labelText[this.state.language][
                    "If other is selected please specify placeholder"
                  ]
                }
                type="text"
              />
            </Row>
          </Container>

          <DangerPictogramCheckbox
            language={this.state.language}
            labelNumber={this.state.formNumber}
          />
          <Button type="submit" variant="primary">
            {" "}
            {labelText[this.state.language]["generate pdf"]}
          </Button>
        </Form>
      </div>
    );
  }
}

function stringifyFormData(fd) {
  const data = {};
  for (let key of fd.keys()) {
    data[key] = fd.get(key);
  }
  return JSON.stringify(data, null, 2);
}

export default LabelForm16;
