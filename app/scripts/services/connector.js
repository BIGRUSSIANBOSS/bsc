'use strict';

/**
 * @ngdoc service
 * @name bscBarcodeWarApp.connector
 * @description
 * # connector
 * Service in the bscBarcodeWarApp.
 */
angular.module('bscBarcodeWarApp')
    .service('connector', ['$http' ,function ($http) {
        // AngularJS will instantiate a singleton by calling "new" on this function

        var connector = (function () {

            return {
                "send": function (obj) {

                    obj.method = obj.method || 'get';
                    obj.path = obj.path || '';
                    obj.data = obj.data || null;
                    obj.success = obj.success || function (data) {
                        console.log(data);
                    };
                    obj.error = obj.error || function (data) {
                        alertify.error("<h3 class='m-5'>"+data.status+"</h3><div>"+data.data+"</div>");
                      };

                    if(obj.method == 'get'){
                        var resp = {
                            method: obj.method,
                            url: obj.path,
                            params: obj.data
                        };
                    }else{
                        var resp = {
                            method: obj.method,
                            url: obj.path,
                            data: obj.data
                        };
                    }
                    $http(resp).then(function (data) {

                            obj.success(data);

                        },function (data) {

                            obj.error(data);

                        });

                }
            }
        })();

        return connector;

    }]);
