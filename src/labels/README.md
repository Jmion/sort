# Content of folder

The `LabelForm*.js` in this folder are used to generate each form.
If any modifications to the form are to be done please modify the appropriate file.
For example if modifications are to be done on label 2 please go and modify `LabelForm2.js`.
If you want to modify the placement of an element on the online form, please modify the `render` function for each label.
If you want to change some text in the form please go and modify the `../data/labelText.json` file. No text should be hard coded into the forms. The site contains all the strings that are used on the website in seperate json files. This allows for easy modification and translation of the site.

## jsPdfGenerator

The `jsPdfGenerator`is the function called to generate the PDF label that is downloaded on the users computer.
Note that the labels that are generated have an image as a background.
This image brings to the label all the graphical that are used as a background.
These images are base64 encoded and stored in `../images/labels/labels.json`.
If the placement of an element on the generated label needs to be modified.
Find the appropriate area of the code and tweek the placement of the images of text (all dimmensions are indicated in mm).

## handleSubmit

This function is called when the user submits the completed form to handle the event and gather the form information before calling `jsPdfGenerator`.

## render

This function renders the form to be filled in on the website.

## constructor

This function that creates the class received the OMoD code, the form number (could have been hard coded), and the language from the Question class
