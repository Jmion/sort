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

class LabelForm18 extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      formNumber: this.props.formNumber,
      omodCode: this.props.omodCode,
      language: this.props.language,
      mCi: "",
      MBq: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Creates the PDF.
   */
  jsPdfGenerator = data => {
    var options = {
      orientation: "l",
      unit: "mm",
      format: "a4",
      putOnlyUsedFonts: true
    };

    // creating the document
    var doc = new jsPDF(options);

    // background image
    doc.addImage(labels[18], "JPEG", 0, 0, 297, 210);

    doc.setFontSize(10);
    doc.setFontType("normal");
    // Remettant
    doc.text(90, 10.5, data.get("remettant"));

    // Group
    doc.text(6, 50, data.get("group name"), { maxWidth: 15 });

    // date
    doc.text(6, 90, data.get("date"));

    //other comments
    doc.setFontSize(10);
    doc.setFontType("normal");
    doc.text(35, 85.2, data.get("pH").toString());
    doc.text(65, 85.2, data.get("metal"), { maxWidth: 80 });
    doc.text(90, 60, data.get("substance"), { maxWidth: 110 });
    doc.text(
      40,
      68,
      "mCi : " + data.get("hl-mci") + "\tMBq : " + data.get("hl-mbq"),
      { maxWidth: 110 }
    );
    doc.text(28, 60, data.get("nuclide"), { maxWidth: 60 });
    doc.text(28, 76.5, data.get("half-life"), { maxWidth: 60 });

    const pictograms_keys = Object.keys(pictograms);

    var nbPicto = 0;
    let pictograms_to_display = [];
    for (var i = 0; i < pictograms_keys.length; i++) {
      if (data.get(pictograms_keys[i]) != null) {
        nbPicto++;
        pictograms_to_display.push(pictograms_keys[i]);
      }
    }

    let pictogramPlacement = calculatePictoSize(40, 29, nbPicto);
    for (i = 0; i < pictogramPlacement[0]; i++) {
      for (var j = 0; j < pictogramPlacement[1]; j++) {
        if (pictogramPlacement[1] * i + j < pictograms_to_display.length) {
          doc.addImage(
            pictograms[pictograms_to_display[pictogramPlacement[1] * i + j]],
            25 + pictogramPlacement[2] * j,
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
    console.log(data.get("omod"));
    this.jsPdfGenerator(data);
  }

  convertRadioactivity = (e, unit) => {
    const mCi_to_MBq_ratio = 37; // 1mCi = 37MBq

    if (unit === "mCi") {
      const new_mCi = e.target.value;
      this.setState({
        mCi: new_mCi,
        MBq: (new_mCi * mCi_to_MBq_ratio).toFixed(
          labelSettings["MBq"]["precision"]
        )
      });
    } else if (unit === "MBq") {
      const new_MBq = e.target.value;
      this.setState({
        mCi: (new_MBq / mCi_to_MBq_ratio).toFixed(
          labelSettings["mCi"]["precision"]
        ),
        MBq: new_MBq
      });
    }
    console.log(e.target.value);
  };

  render() {
    var date = new Date();
    var picto = radioactive;
    return (
      <div>
        <Form className="LabelFormLayout" onSubmit={this.handleSubmit}>
          <Row>
            <Form.Group controlId="date">
              <Col sm="4">
                <Form.Label>Date:</Form.Label>
              </Col>
              <Col sm="8">
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
          </Row>

          <Form.Group controlId="formGroupName">
            <Form.Row>
              <Form.Label>
                {labelText[this.state.language]["group name"] +
                  (false ? " *" : "")}
              </Form.Label>
              <Form.Control
                required={false}
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
                {labelText[this.state.language]["remettant"] + " *"}
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

          <Form.Row>
            <Col>
              <Form.Label>
                {labelText[this.state.language]["other substances"]}
              </Form.Label>
              <Form.Control type="text" name="substance" />
            </Col>
            <Col>
              <Form.Group controlId="nuclide">
                <Form.Label>
                  {labelText[this.state.language]["nuclide"] + " *"}
                </Form.Label>
                <Form.Control
                  required
                  name="nuclide"
                  placeholder={labelText[this.state.language]["nuclide"]}
                  type="text"
                />
              </Form.Group>
            </Col>
          </Form.Row>

          <Form.Group controlId="activity">
            <Form.Label>
              {labelText[this.state.language]["activity"]}
            </Form.Label>
            <Form.Row>
              <Col>
                <Form.Group controlId="mci">
                  <Form.Label>mCi *</Form.Label>
                  <Form.Control
                    required
                    value={this.state.mCi}
                    name="hl-mci"
                    placeholder="mCi"
                    type="number"
                    onChange={e => {
                      this.convertRadioactivity(e, "mCi");
                    }}
                    step={1 / Math.pow(10, labelSettings["mCi"]["precision"])}
                    max={labelSettings["mCi"]["max"]}
                    min={labelSettings["mCi"]["min"]}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="mbq">
                  <Form.Label>MBq *</Form.Label>
                  <Form.Control
                    required
                    value={this.state.MBq}
                    name="hl-mbq"
                    placeholder="MBq"
                    type="number"
                    onChange={e => {
                      this.convertRadioactivity(e, "MBq");
                    }}
                    step={1 / Math.pow(10, labelSettings["MBq"]["precision"])}
                    max={labelSettings["MBq"]["max"]}
                    min={labelSettings["MBq"]["min"]}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="half-life">
                  <Form.Label>
                    {labelText[this.state.language]["half-life"] + " *"}
                  </Form.Label>
                  <Form.Control
                    required
                    placeholder={labelText[this.state.language]["half-life"]}
                    type="text"
                    name="half-life"
                  />
                </Form.Group>
              </Col>
            </Form.Row>
          </Form.Group>

          <Form.Group controlId="formMetalPh">
            <Form.Row>
              <Col>
                <Form.Label>
                  {labelText[this.state.language]["metal"]}
                </Form.Label>
                <Form.Control
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

export default LabelForm18;
