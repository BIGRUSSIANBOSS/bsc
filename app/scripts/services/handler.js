'use strict';

/**
 * @ngdoc service
 * @name bscBarcodeWarApp.handler
 * @description
 * # handler
 * Service in the bscBarcodeWarApp.
 */
angular.module('bscBarcodeWarApp')
    .service('handler', function () {

      return {
        act: function (action, data) {
          this[action](data);
        },
        getHandlers: function(data){
          var handlers = data.data.handlers;
          for(var id in handlers){
            handlers[id].visible = true;
          }
          return handlers;
        },
        testOK: function (data) {
          console.log(data);
        },
        newHandler: function (data) {
          console.log(data);
        },
        translate: function (data) {
          console.log(data);
        },
        getVersions: function (data) {
          //console.log(data.data.handler);

          data.data.handler.versions.sort(function (a, b) {
            if (a.version < b.version) {
              return -1;
            }
            if (a.version >= b.version) {
              return 1;
            }
          });
          return data.data.handler;
        },
        versionToProd: function (data) {
          //console.log(data.data.handler);
          return data.data.handler;
        },
        updateVersion: function (data) {
          console.log(data);
        },
        newVersions: function (data) {
          console.log(data);
        },
        revokeProduction: function (data) {
          console.log(data);
        },
        logEvents: function (data) {
          console.log(data);
        }
      }

    });
