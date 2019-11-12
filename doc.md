# REACT

Render element in index.js with:

```JS
ReactDOM.render(<Car />, document.getElementById('root'));
```

## JSX

### One top element
The HTML code must be wrapped in ONE top level element.

So if you like to write two headers, you must put them inside a parent element, like ```div```  element

### Element must be closed
JSX follows XML rules, and therefore HTML elements must be properly closed.

## React Component

### Create a Class Component
When creating a React component, the component's name must start with an upper case letter.

The component has to include the ```extends React.Component``` statement, this statement creates an inheritance to React.Component, and gives your component access to React.Component's functions.

The component also requires a ```render()``` method, this method returns HTML.

#### Example

```JS
class Car extends React.Component {
  render() {
    return <h2>Hi, I am a Car!</h2>;
  }
}
```


### Component Constructor

If there is a ```constructor()``` function in your component, this function will be called when the component gets initiated.

The constructor function is where you initiate the component's properties.

In React, component properties should be kept in an object called ```state```.

You will learn more about ```state``` later in this tutorial.

The constructor function is also where you honor the inheritance of the parent component by including the ```super()``` statement, which executes the parent component's constructor function, and your component has access to all the functions of the parent component (```React.Component```).

#### Example

```JS
class Car extends React.Component {
  constructor() {
    super();
    this.state = {color: "red"};
  }
  render() {
    return <h2>I am a {this.state.color} Car!</h2>;
  }
}
```

### Props

Another way of handling component properties is by using **props**.

Props are like function arguments, and you send them into the component as attributes.

You will learn more about **props** in the next chapter.


```JS
class Car extends React.Component {
  render() {
    return <h2>I am a {this.props.color} Car!</h2>;
  }
}

ReactDOM.render(<Car color="red"/>, document.getElementById('root'));
```

### Components in Components

```R
class Car extends React.Component {
  render() {
    return <h2>I am a Car!</h2>;
  }
}

class Garage extends React.Component {
  render() {
    return (
      <div>
      <h1>Who lives in my Garage?</h1>
      <Car />
      </div>
    );
  }
}

ReactDOM.render(<Garage />, document.getElementById('root'));
```

### Components in Files

React is all about re-using code, and it can be smart to insert some of your components in separate files.

To do that, create a new file with a .js file extension and put the code inside it:

Note that the file must start by importing React (as before), and it has to end with the statement export default Car;.

```JS
import React from 'react';
import ReactDOM from 'react-dom';

class Car extends React.Component {
  render() {
    return <h2>Hi, I am a Car!</h2>;
  
 
}
}

export default Car;
```

### Pass data

Props are also how you pass data from one component to another, as parameters.

```JS
class Car extends React.Component {
  render() {
    return <h2>I am a {this.props.brand}!</h2>;
  }
}

class Garage extends React.Component {
  render() {
    return (
      <div>
      <h1>Who lives in my garage?</h1>
      <Car brand="Ford" />
      </div>
    );
  }
}

ReactDOM.render(<Garage />, document.getElementById('root'));
```
If you have a variable to send, and not a string as in the example above, you just put the variable name inside curly brackets:


```JS
class Car extends React.Component {
  render() {
    return <h2>I am a {this.props.brand}!</h2>;
  }
}

class Garage extends React.Component {
  render() {
    const carname = "Ford";
    return (
      <div>
      <h1>Who lives in my garage?</h1>
      <Car brand={carname} />
      </div>
    );
  }
}

ReactDOM.render(<Garage />, document.getElementById('root'));
```

### Props in the constructor

If your component has a constructor function, the props should always be passed to the constructor and also to the React.Component via the super() method.

```JS
class Car extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h2>I am a Car!</h2>;
  }
}

ReactDOM.render(<Car model="Mustang"/>, document.getElementById('root'));
```

**Note: React Props are read-only! You will get an error if you try to change their value.**

## React State

React components has a built-in state object.

The state object is where you store property values that belongs to the component.

When the state object changes, the component re-renders

```JS
class Car extends React.Component {
  constructor(props) {
    super(props);
    this.state = {brand: "Ford"};
  }
  render() {
    return (
      <div>
        <h1>My Car</h1>
      </div>
    );
  }
}
```

The state object can contain as many properties as you like:




```JS
class Car extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964
    };
  }
  render() {
    return (
      <div>
        <h1>My Car</h1>
      </div>
    );
  }
}
```

Refer to the state object anywhere in the component by using the *this.state.propertyname* syntax:

```JS
class Car extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964
    };
  }
  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          It is a {this.state.color}
          {this.state.model}
          from {this.state.year}.
        </p>
      </div>
    );
  }
}
```

### Changing the state Object

To change a value in the state object, use the *this.setState()* method.

When a value in the **state** object changes, the component will re-render, meaning that the output will change according to the new value(s).

```JS
class Car extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964
    };
  }
  changeColor = () => {
    this.setState({color: "blue"});
  }
  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          It is a {this.state.color}
          {this.state.model}
          from {this.state.year}.
        </p>
        <button
          type="button"
          onClick={this.changeColor}
        >Change color</button>
      </div>
    );
  }
}
```

Always use the *setState()* method to change the state object, it will ensure that the component knows its been updated and calls the render() method (and all the other lifecycle methods).


# Install
npm install react-hotkeys@next --save
npm i @bit/grommet.grommet-icons.tooltip
npm i react-scroll-to-bottom
npm install --save html2pdf.js


# History detection mecanisme
To detect a change to the pas history we are using the fact that the colour of the button is set. If the color is already set then we know that this is not the first clock on the question. Therefor we will call the history 
