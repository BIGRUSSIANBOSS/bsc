'use strict';

describe('Service: handler', function () {

  // load the service's module
  beforeEach(module('bscBarcodeWarApp'));

  // instantiate service
  var handler;
  beforeEach(inject(function (_handler_) {
    handler = _handler_;
  }));

  it('should do something', function () {
    expect(!!handler).toBe(true);
  });

});
