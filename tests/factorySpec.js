'use strict';

describe('bindQuerystring.bindQuerystring', function() {

  beforeEach(module('bindQuerystring'));

  var $location;
  var $rootScope;
  var bindQuerystring;

  beforeEach(inject(function(_$location_, _$rootScope_, _bindQuerystring_) {
    $location = _$location_;
    $rootScope = _$rootScope_;
    bindQuerystring = _bindQuerystring_;
  }));

  it('should define bindQuerystring factory', function() {
    expect(bindQuerystring).to.be.ok;
  });

  it('should pull data from querystring to scope', function() {
    $location.search({
      foo: 'foo'
    });
    var scope = $rootScope.$new();
    bindQuerystring(scope, 'foo');
    expect(scope.foo).to.equal('foo');
  });

  it('should pull data from scope to querystring', function() {
    var scope = $rootScope.$new();
    scope.foo = 'foo';
    bindQuerystring(scope, 'foo');
    expect($location.search().foo).to.equal('foo');
  });

  it('should listen for changes in querystring and update scope', function() {
    var scope = $rootScope.$new();
    bindQuerystring(scope, 'foo');
    $location.search({
      foo: 'foo'
    });
    $rootScope.$digest();
    expect(scope.foo).to.equal('foo');
  });

  it('should listen for changes in scope and update querystring', function() {
    var scope = $rootScope.$new();
    bindQuerystring(scope, 'foo');
    $rootScope.$digest();
    scope.foo = 'foo';
    $rootScope.$digest();
    expect($location.search().foo).to.equal('foo');
  });

});
