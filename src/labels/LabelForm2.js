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

class LabelForm2 extends React.Component {
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
    doc.addImage(labels[2], "JPEG", 0, 0, 297, 210);

    //OMoD
    doc.setFont("arial");
    doc.setFontType("bold");
    doc.setFontSize(16);
    doc.text(120, 41, data.get("omod"));

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
    doc.text(50, 73, data.get("substance"), { maxWidth: 80 });
    doc.text(42, 85, data.get("solvent"), { maxWidth: 110 });
    doc.text(35, 98, data.get("pH").toString());
    doc.text(64, 98, data.get("metal"), { maxWidth: 70 });

    // X ticks
    doc.setFontType("bold");
    if (data.get("neutralized") != null) {
      doc.text(27.5, 55, "X");
    }
    if (data.get("refrigerated transport") != null) {
      doc.text(85.2, 55, "X");
    }
    if (data.get("nanoparticules") != null) {
      doc.text(27.5, 66.2, "X");
    }
    if (data.get("chemical waste") != null) {
      doc.text(85.2, 66.2, "X");
    }

    const pictograms_keys = Object.keys(pictograms);

    var nbPicto = 0;
    let pictograms_to_display = [];
    for (var i = 0; i < pictograms_keys.length; i++) {
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
      <div className="LabelFormLayout container">
        <Form onSubmit={this.handleSubmit}>
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

          <Form.Group controlId="substance">
            <Form.Label>
              {labelText[this.state.language]["substance"]}
            </Form.Label>
            <Form.Control as="textarea" rows="3" required name="substance" />
          </Form.Group>

          <Form.Group controlId="solvent">
            <Form.Label>{labelText[this.state.language]["solvant"]}</Form.Label>
            <Form.Control as="textarea" rows="3" required name="solvent" />
          </Form.Group>

          <Form.Group controlId="formMetalPh">
            <Form.Row>
              <Col>
                <Form.Label>
                  {labelText[this.state.language]["metal"]}
                </Form.Label>
                <Form.Control
                  required
                  name="metal"
                  placeholder={
                    labelText[this.state.language]["metal placeholder"]
                  }
                  type="text"
                />
              </Col>
              <Col>
                <Form.Label>{labelText[this.state.language]["pH"]}</Form.Label>
                <Form.Control
                  name="pH"
                  placeholder={labelText[this.state.language]["pH placeholder"]}
                  type="number"
                  step={labelSettings["pH"]["step"]}
                  max={labelSettings["pH"]["max"]}
                  min={labelSettings["pH"]["min"]}
                />
              </Col>
            </Form.Row>
          </Form.Group>

          <h3>{labelText[this.state.language]["special waste"]}:</h3>
          <p>{labelText[this.state.language]["indicate all information"]}</p>

          <Container>
            <Row>
              <Col>
                <Form.Check
                  custom
                  className="checkbox_margin"
                  name="neutralized"
                  label={labelText[this.state.language]["neutralised waste"]}
                  type="checkbox"
                  id={"neutrlized"}
                />
              </Col>
              <Col>
                <Form.Check
                  custom
                  className="checkbox_margin"
                  name="refrigerated transport"
                  label={
                    labelText[this.state.language]["refrigerated transport"]
                  }
                  type="checkbox"
                  id={"regrideratedWaste"}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Check
                  custom
                  className="checkbox_margin"
                  name="nanoparticules"
                  label={labelText[this.state.language]["nanoparticules"]}
                  type="checkbox"
                  id={"nanoparticules"}
                />
              </Col>
              <Col>
                <Form.Check
                  custom
                  className="checkbox_margin"
                  name="chemical waste"
                  label={labelText[this.state.language]["chemical waste"]}
                  type="checkbox"
                  id={"chemicalWaste"}
                />
              </Col>
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

export default LabelForm2;
