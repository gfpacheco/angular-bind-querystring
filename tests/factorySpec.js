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
    bindQuerystring({
      target: scope,
      properties: ['foo']
    });
    expect(scope.foo).to.equal('foo');
  });

  it('should pull data from scope to querystring', function() {
    scope.foo = 'foo';
    bindQuerystring({
      target: scope,
      properties: ['foo']
    });
    expect($location.search().foo).to.equal('foo');
  });

  it('should listen for changes in querystring and update scope', function() {
    bindQuerystring({
      target: scope,
      properties: ['foo']
    });
    $location.search({
      foo: 'foo'
    });
    $rootScope.$digest();
    expect(scope.foo).to.equal('foo');
  });

  it('should listen for changes in scope and update querystring', function() {
    bindQuerystring({
      target: scope,
      properties: ['foo']
    });
    $rootScope.$digest();
    scope.foo = 'foo';
    $rootScope.$digest();
    expect($location.search().foo).to.equal('foo');
  });

  it('should parse data before pulling from querystring to scope', function() {
    $location.search({
      foo: '123'
    });
    bindQuerystring({
      target: scope,
      properties: ['foo'],
      parser: function(value) {
        return parseInt(value);
      }
    });
    expect(scope.foo).to.equal(123);
  });

  it('should format data before pulling from scope to querystring', function() {
    scope.foo = 123;
    bindQuerystring({
      target: scope,
      properties: ['foo'],
      formatter: function(value) {
        return '' + value;
      }
    });
    expect($location.search().foo).to.equal('123');
  });

});
