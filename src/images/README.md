# Information

This folder contains all of the images that are being used on the website.

## labels

This folder contains all of the images that are used when creating the labels. This inculdes the background images and the base64 pictograms.

## logo

This folder contains all of the different formats of the websites logo

## pictograms

This folder contains all of the danger pictograms in svg. These pictograms are used when a question needs to display a danger pictogram.

## popover_image

The `popover_image.json` file contains a base64 representation of the images that are to be displayed in the more information tooltips on the website. Please note that to display an image on a tooltip of the website the picture must be added to `images.json` and it's key number referenced in the `treeXX.json` file. If no picture is to be displayed please simply leave an empty string "" as the value of the picture. Please see README.md in the `src` folder for detailed instructions.

## images.json

If you want to display an image in the (leaves), part of the tree where the information for the disposal of the waste is specified you can add the image as a base64 encoded image to the `images.json` file and add its reference (key) number to the `../treeXX.json` file. If no picture is to be displayed please simply leave an empty string "" as the value of the picture. Please see README.md in the `src` folder for detailed instructions.
