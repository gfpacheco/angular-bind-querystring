'use strict';

describe('bindQuerystring.bindQuerystring', function() {

  beforeEach(module('bindQuerystring'));

  var bindQuerystring;

  beforeEach(inject(function(_bindQuerystring_) {
    bindQuerystring = _bindQuerystring_;
  }));

  it('should define bindQuerystring factory', function() {
    expect(bindQuerystring).to.be.ok;
  });

});
