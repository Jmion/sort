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
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import labelText from "../data/labelText.json";
import labelSettings from "../data/labelSettings.json";

import pictograms from "../images/labels/picotrgram.json"; //base64 encoded https://www.base64-image.de/
import Container from "react-bootstrap/Container";

import "./LabelForm.css";

/**
 * Renders a single checkbox, with the pictogram associated to it. This class is a sub-component of the DangerPictogramCheckbox class and should not be used outside of this context.
 * 
 * It assumes that is is wrapped in:
 * 
 * <Container>
        <Form.Label>
          {labelText[this.state.language]["danger pictograms"]}
        </Form.Label>
        <Row>
            <SinglePicto checkBoxName="name of pictogram"/>
        </Row>
      </Container>
 *
 * It is important to wrap it as shown above because it will allow bootstrap to make the pictograms layout change dynamically depending on screen size
 */
class SinglePicto extends React.Component {
  /**
   * Props must contain the checkBoxName. The checkBoxName must correspond to one of the keys in the ../images/labels/pictogram.json
   *
   * @param {} props
   */
  constructor(props) {
    super(props);
    this.state = {
      checkBoxName: props.checkBoxName,
      labelNumber: props.labelNumber
    };
  }

  /**
   * Links the name of the pictograms with there React equivalent imports. Usefull when name is deffined as string to fetch the corresponding image.
   *
   * @param {string} img Name of the image.
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
      case "radioactive":
        return radioactive;
      default:
        console.warn(
          "Pictogram requested not found. Value of string was " + img
        );
    }
  }

  /**
   * Renders a single checkbox. Cannot be used as
   */
  render() {
    const picotrgram_to_not_display =
      labelSettings["pictograms_not_to_show"][this.state.labelNumber];
    if (!picotrgram_to_not_display.includes(this.state.checkBoxName)) {
      let picto = this.imageResolver(this.state.checkBoxName);
      return (
        <Col className="col-xs-6 col-sm-4 col-md-3 col-lg-2">
          <Form.Check
            custom
            className="pictogramMargin"
            name={this.state.checkBoxName}
            label={<Image className="image_checkbox" src={picto} fluid />}
            type="checkbox"
            id={this.state.checkBoxName}
          />
        </Col>
      );
    }
    return "";
  }
}

/**
 * Danger pictograms checkboxes to be used in the context of a form.
 */
class DangerPictogramCheckbox extends React.Component {
  /**
   * Props must contain the current language to allow for multilingual display.
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      language: props.language,
      labelNumber: props.labelNumber
    };
  }

  render() {
    const temp = Object.keys(pictograms);

    return (
      <Container>
        <Form.Label>
          {labelText[this.state.language]["danger pictograms"]}
        </Form.Label>
        <Row>
          {temp.map(item => (
            <SinglePicto
              key={item}
              checkBoxName={item}
              labelNumber={this.state.labelNumber}
            />
          ))}
        </Row>
      </Container>
    );
  }
}

export default DangerPictogramCheckbox;
