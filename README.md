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
  bindQuerystring($scope, 'foo');
});
```

### Parser and formatter

You can send a parser and/or a formatter function to handle the value serialization:

```javascript
angular.module('yourModule').controller(function($scope, bindQuerystring) {
  bindQuerystring($scope, 'foo', {
    parser: function(value) {
      // parse value from querystring to scope property
      return parseInt(value);
    },
    formatter: function(value) {
      // formats value from scope property to querystring
      return '' + value;
    }
  });
});
```

### Nested property

The bound property doesn't need to be at scope's root, you can use dot-notated property name:

```javascript
angular.module('yourModule').controller(function($scope, bindQuerystring) {
  $scope.foo = {};
  bindQuerystring($scope, 'foo.bar');
});
```

### Default value

You can set a default value if the property does not exists in querystring or scope yet:

```javascript
angular.module('yourModule').controller(function($scope, bindQuerystring) {
  bindQuerystring($scope, 'foo', {
    default: 'foo'
  });
});
```

## Contributing

Any help is appreciated, feel free to open issues and submit pull requests.
