# Ussage of the 2 JSON files located in this directory

Both of these files contain images encoded in base64. The website that was used to encoded these images is: https://www.base64-image.de/. We would have preferred not to store the images in base64 but the pdf generator that we are using supports base64.

The `labels.json` contains the label iamges encoded in base64. This is used in LabelForm to as a background image where the text from the user is added on top.

The `pictogram.json` contains the pictograms encoded in base64. This is used in the LabelForm to set the pictograms that the user selects. Please note that the name of the keys in this document are used when determining what picotgram to use during the label generation process.
