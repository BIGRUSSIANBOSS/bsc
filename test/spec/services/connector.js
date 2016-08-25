'use strict';

describe('Service: connector', function () {

  // load the service's module
  beforeEach(module('bscBarcodeWarApp'));

  // instantiate service
  var connector;
  beforeEach(inject(function (_connector_) {
    connector = _connector_;
  }));

  it('should do something', function () {
    expect(!!connector).toBe(true);
  });

});
