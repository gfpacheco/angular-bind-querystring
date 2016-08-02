# angular-bind-querystring [![Build Status](https://travis-ci.org/gfpacheco/angular-bind-querystring.svg?branch=master)](https://travis-ci.org/gfpacheco/angular-bind-querystring)

Two way binding between scope variables and URL querystring with default values.

## Installation

Angular is a peer-dependency of this project so you need to install it separately.

### Install with NPM

```sh
npm install --save angular-bind-querystring
```

### Install with Bower

```sh
bower install --save angular-bind-querystring
```

## Setup

### Load the script

Add the `dist/angular-bind-querystring.min.js` to your HTML file.

### Add as dependency

Add `bindQuerystring` module as a dependency of your Angular app:

```javascript
angular.module('yourModule', ['bindQuerystring']);
```

## Usage

```javascript
angular.module('yourModule').controller(function($scope, bindQuerystring) {
  var target = {};
  bindQuerystring({
    target: target,
    properties: ['foo']
  });
});
```

Then every change on URL querystring or the target object (given the selected properties) will be
reflected in both.

### Parser and formatter

You can send a parser and/or a formatter function to handle the value serialization:

```javascript
angular.module('yourModule').controller(function($scope, bindQuerystring) {
  var target = {};
  bindQuerystring({
    target: target,
    properties: ['foo'],
    parser: function(value, property) {
      // parse value from querystring to scope property
      return parseInt(value);
    },
    formatter: function(value, property) {
      // formats value from scope property to querystring
      return '' + value;
    }
  });
});
```

Parsers and formatters receive the actual value and the name of the property being transformed.

### Options

- `target` - the object that holds the properties being bound
- `properties` - an array of strings naming the properties that should be bound
- `scope` _(optional)_ - isn't required, but **prevents memory leak over time**
- `parser` _(optional)_ - function that converts the URL query string to your model
- `formatter` _(optional)_ - function that converts your model to the URL query string

## Contributing

Any help is appreciated, feel free to open issues and submit pull requests.
