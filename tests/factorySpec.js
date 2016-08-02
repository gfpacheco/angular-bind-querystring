'use strict';

describe('bindQuerystring.bindQuerystring', function() {

  beforeEach(module('bindQuerystring'));

  var $location;
  var $rootScope;
  var bindQuerystring;
  var scope;

  beforeEach(inject(function(_$location_, _$rootScope_, _bindQuerystring_) {
    $location = _$location_;
    $rootScope = _$rootScope_;
    bindQuerystring = _bindQuerystring_;
    scope = $rootScope.$new();
  }));

  it('should define bindQuerystring factory', function() {
    expect(bindQuerystring).to.be.ok;
  });

  it('should pull data from querystring to scope', function() {
    $location.search({
      foo: 'foo'
    });
    bindQuerystring(scope, 'foo');
    expect(scope.foo).to.equal('foo');
  });

  it('should pull data from scope to querystring', function() {
    scope.foo = 'foo';
    bindQuerystring(scope, 'foo');
    expect($location.search().foo).to.equal('foo');
  });

  it('should listen for changes in querystring and update scope', function() {
    bindQuerystring(scope, 'foo');
    $location.search({
      foo: 'foo'
    });
    $rootScope.$digest();
    expect(scope.foo).to.equal('foo');
  });

  it('should listen for changes in scope and update querystring', function() {
    bindQuerystring(scope, 'foo');
    $rootScope.$digest();
    scope.foo = 'foo';
    $rootScope.$digest();
    expect($location.search().foo).to.equal('foo');
  });

  it('should parse data before pulling from querystring to scope', function() {
    $location.search({
      foo: '123'
    });
    bindQuerystring(scope, 'foo', {
      parser: function(value) {
        return parseInt(value);
      }
    });
    expect(scope.foo).to.equal(123);
  });

  it('should format data before pulling from scope to querystring', function() {
    scope.foo = 123;
    bindQuerystring(scope, 'foo', {
      formatter: function(value) {
        return '' + value;
      }
    });
    expect($location.search().foo).to.equal('123');
  });

  it('should use default value if property does not exist in querystring or scope', function() {
    bindQuerystring(scope, 'foo', {
      default: 'foo'
    });
    expect($location.search().foo).to.equal('foo');
  });

  it('should pull data from querystring to target when using dot-notated property', function() {
    scope.foo = {};
    $location.search({
      bar: 'bar'
    });
    bindQuerystring(scope, 'foo.bar');
    expect(scope.foo.bar).to.equal('bar');
  });

  it('should pull data from target to querystring when using dot-notated property', function() {
    scope.foo = {
      bar: 'bar'
    };
    bindQuerystring(scope, 'foo.bar');
    expect($location.search().bar).to.equal('bar');
  });

  it('should listen for changes in querystring and update target when using dot-notated property', function() {
    scope.foo = {};
    bindQuerystring(scope, 'foo.bar');
    $location.search({
      bar: 'bar'
    });
    $rootScope.$digest();
    expect(scope.foo.bar).to.equal('bar');
  });

  it('should listen for changes in target and update querystring when using dot-notated property', function() {
    bindQuerystring(scope, 'foo.bar');
    $rootScope.$digest();
    scope.foo = {
      bar: 'bar'
    };
    $rootScope.$digest();
    expect($location.search().bar).to.equal('bar');
  });

  it('should parse data before pulling from querystring to target when using dot-notated property', function() {
    scope.foo = {};
    $location.search({
      bar: '123'
    });
    bindQuerystring(scope, 'foo.bar', {
      parser: function(value) {
        return parseInt(value);
      }
    });
    expect(scope.foo.bar).to.equal(123);
  });

  it('should format data before pulling from target to querystring when using dot-notated property', function() {
    scope.foo = {
      bar: 123
    };
    bindQuerystring(scope, 'foo.bar', {
      formatter: function(value) {
        return '' + value;
      }
    });
    expect($location.search().bar).to.equal('123');
  });

  it('should use default value if property does not exist in querystring or scope when using dot-notated property', function() {
    scope.foo = {};
    bindQuerystring(scope, 'foo.bar', {
      default: 'bar'
    });
    $rootScope.$digest();
    expect(scope.foo.bar).to.equal('bar');
  });

});
