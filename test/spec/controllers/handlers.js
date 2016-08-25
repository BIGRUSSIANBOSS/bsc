'use strict';

describe('Controller: HandlersCtrl', function () {

  // load the controller's module
  beforeEach(module('bscBarcodeWarApp'));

  var HandlersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HandlersCtrl = $controller('HandlersCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HandlersCtrl.awesomeThings.length).toBe(3);
  });
});
