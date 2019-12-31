# SORT

Sort uses the React framework to build a PWA (progressive web app). If you are not familiar with React please read up on the subject before continuing. Knowing the basics of HTML, CSS, and Javascript is also required to be able to understand what has been done in this project.

## Motivation

We decided to make a progressive web app since it allows for good usability in areas where internet conection is spoty. It is for this reason that we chose to use React to build our website. Bootstrap is being used to build a reactive design that will allow the website to look good on any device size. We want SORT to work on any device from a small cell phone to a huge computer screen.

## Getting started

Our main website component is called _index.js_ within this JS we render our single object which is situated in _App.js_. It is within _App.js_ that most of the code for the webiste resides.

Our `App.js` is in charge of keeping track of what questions where answered and rendering the appropriate questions. A question in this project is an object that represents a question that the user must awnser, or information about how to dispose of the waste as well as rendering the form to fill in to create the label. `App.js` simply take care of rendering the website in the correct language, dealing with the history of previously awnsered questions, and redering new questions/information once I user has anwsered them.

`Question.js` get's all the infromation that it needs from `App.js` and renders the question or _leaf (information on how to dispose of the waste)_.

## How to modify stuff:

### Decision tree and other webiste text

The decision tree is located in `./data/treeEN.json` or `./data/treeFR.json` depending on what language you wich to modify. Do know more on how to edit this please read the `README.md` in the `./data/` folder.

### Adding an image to the more information pop up

This is a multistep process. Please follow it carefully.

1. Export the image that you wich to add as a **png**. If the image is displayed on the website is to large please resize the image.
2. Get a base64 version of the image. Sounds scarry, it isn't. It is a simple way used in websites to store images as text. We would recommend that you use a website to convert your image to base64 such as https://www.base64-image.de/
3. Paste the base64 representation
