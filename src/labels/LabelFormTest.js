import React from "react";
import corrosion from "../images/pictograms/corrosion.svg";
import environment from "../images/pictograms/environment.svg";
import exclamation_mark from "../images/pictograms/exclamation_mark.svg";
import exploding_bomb from "../images/pictograms/exploding_bomb.svg";
import flamable from "../images/pictograms/flamable.svg";
import gas_cylinder from "../images/pictograms/gas_cylinder.svg";
import health_hazard from "../images/pictograms/health_hazard.svg";
import oxidizer from "../images/pictograms/oxidizer.svg";
import skull from "../images/pictograms/skull.svg";
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

    //
    const pictograms_keys = Object.keys(pictograms);

    var nbPicto = 0;
    let pictograms_to_display = [];
    for (var i = 0; i < pictograms_keys.length; i++) {
      if (data.get(pictograms_keys[i]) != null) {
        nbPicto++;
        pictograms_to_display.push(pictograms_keys[i]);
      }
    }

    let pictogramPlacement = this.calculatePictoSize(60, 29, nbPicto);
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

    //doc.rect(5, 13, 60, 29, "F");

    doc.save("label.pdf");
  };

  /**
   * Calculated the placement of the pictograms and there ideal size
   *
   * @author https://math.stackexchange.com/questions/466198/algorithm-to-get-the-maximum-size-of-n-squares-that-fit-into-a-rectangle-with-a/466248
   *
   * @param {int} x dimmension of the cell where the picotgrams are to be displayed
   * @param {int} y dimmension of the cell where the pictograms are to be displayed
   * @param {int} n number of pictograms to be displayed
   * @returns Array containing [number of row, number of collums, pictogram size]
   */
  calculatePictoSize(x, y, n) {
    // Compute number of rows and columns, and cell size
    var ratio = x / y;
    var ncols_float = Math.sqrt(n * ratio);
    var nrows_float = n / ncols_float;

    // Find best option filling the whole height
    var nrows1 = Math.ceil(nrows_float);
    var ncols1 = Math.ceil(n / nrows1);
    while (nrows1 * ratio < ncols1) {
      nrows1++;
      ncols1 = Math.ceil(n / nrows1);
    }
    var cell_size1 = y / nrows1;

    // Find best option filling the whole width
    var ncols2 = Math.ceil(ncols_float);
    var nrows2 = Math.ceil(n / ncols2);
    while (ncols2 < nrows2 * ratio) {
      ncols2++;
      nrows2 = Math.ceil(n / ncols2);
    }
    var cell_size2 = x / ncols2;

    // Find the best values
    var nrows, ncols, cell_size;
    if (cell_size1 < cell_size2) {
      nrows = nrows2;
      ncols = ncols2;
      cell_size = cell_size2;
    } else {
      nrows = nrows1;
      ncols = ncols1;
      cell_size = cell_size1;
    }
    return [nrows, ncols, cell_size];
  }

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
                  date.getMonth() +
                  "/" +
                  date.getFullYear()
                }
                id="fixFormValue"
              />
            </Col>
          </Form.Group>

          <Form.Group controlId="formGroupName">
            <Form.Row>
              <Col sm="9">
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
              <Col sm="3">
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
                defaultValue="ISIC-CH/PH-1015 Lausanne"
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
                  required
                  name="pH"
                  placeholder={labelText[this.state.language]["pH"]}
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
