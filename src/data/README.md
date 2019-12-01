# How to edit the website

All of the content that is easly modifiable is deffined in this directory.

## Tree

Our website has two trees. One for french and one for english ```treeEN.json``` and ```treeFR.json```. A tree is composed of nodes and leaves. Leaves are at the end of a tree, just like a tree in nature. 

### Node

A node is deffined as 
```JSON
        "isLeaf": "0",
        "question": "The question to ask the user. Allows HTML formating",
        "information": "A information banner that will be shown before the question. Allows HTML formating",
        "pictogram" : "The name of a pictogram. See more info bellow" ,
        "moreInfo" : "Some information that will show up as a tooltip on the users screen. Allows HTML formating",
        "yesBranch": { Some other tree element (leaf or node) },
        "noBranch": { Some other tree element (leaf or node) }
```

All nodes nead to have the *isLeaf* variable set to 0. The rest is left up to customization. Not respecting the proper format of the tree could lead to the website crashing

### Leaf
A leaf is the final element of the tree. No new question will be asked to the user. A leaf corresponds to having identified the waste that we want to sort.

```JSON
"isLeaf": "1",
"information": "Some intresting informaiton on how to dispose of the waste. Allow HTLM formatting",
"omod_code" : "N/A",
"label": "N/A"
```
All leaves need to have the variable *isLeaf* set to 1
The label number is used to determine what form the user should be prompted to fill in to generate the label. The OMoD code is used to generate the label with the correct code.


### Pictogram
You can chose the pictograms from the list of the following pictograms:

* corrosion
* environment
* exclamation_mark 
* exploding_bomb 
* flamable 
* gas_cylinder
* health_hazard
* oxidizer
* skull
* combo
* radioactive

## Website Text
All of the other text that is not linked to a question is deffined in ```websiteText.json```.
Please feel free to edit any of the values. Modifying the key of a an element in this table will cause the website to break.

If you do not know what a JSON key or value is read on.

```JSON
{
    "key": "value"
}
```

## Label text
If there is a need to change the text displayed with the form when the user is filling in the required information to generate a label please modify ```labelText.json```. The same set of constraints apply to as with modifying the information. **Only modify the ```value``` and leave the ```key``` as is**.

## Label Settings

Some fields that are being requested by the form have settings that can be modified in the ```labelSettings.json```. Example of values that can be changed in the label settings is: 

```JSON
"mCi": {
        "precision": Number of decimal places,
        "min": "value allowed",
        "max": "value allowed"
    }
```
