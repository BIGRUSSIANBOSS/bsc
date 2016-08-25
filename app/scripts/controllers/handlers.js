'use strict';

/**
 * @ngdoc function
 * @name bscBarcodeWarApp.controller:HandlersCtrl
 * @description
 * # HandlersCtrl
 * Controller of the bscBarcodeWarApp
 */

$(document).ready(function(){
  $(function () {
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });
  })
});

function isset(obj){
  try{
    if(typeof obj == 'undefined'){
      return false;
    }else{
      return true;
    }
  }catch(e){
    return false;
  }
}

function utf8_to_b64(str) {
  return window.btoa(escape(encodeURIComponent(str)));
}

function b64_to_utf8(str) {
  return decodeURIComponent(unescape(window.atob(str)));
}

var DMap = {0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 18: 18, 19: 19, 20: 20, 21: 21, 22: 22, 23: 23, 24: 24, 25: 25, 26: 26, 27: 27, 28: 28, 29: 29, 30: 30, 31: 31, 32: 32, 33: 33, 34: 34, 35: 35, 36: 36, 37: 37, 38: 38, 39: 39, 40: 40, 41: 41, 42: 42, 43: 43, 44: 44, 45: 45, 46: 46, 47: 47, 48: 48, 49: 49, 50: 50, 51: 51, 52: 52, 53: 53, 54: 54, 55: 55, 56: 56, 57: 57, 58: 58, 59: 59, 60: 60, 61: 61, 62: 62, 63: 63, 64: 64, 65: 65, 66: 66, 67: 67, 68: 68, 69: 69, 70: 70, 71: 71, 72: 72, 73: 73, 74: 74, 75: 75, 76: 76, 77: 77, 78: 78, 79: 79, 80: 80, 81: 81, 82: 82, 83: 83, 84: 84, 85: 85, 86: 86, 87: 87, 88: 88, 89: 89, 90: 90, 91: 91, 92: 92, 93: 93, 94: 94, 95: 95, 96: 96, 97: 97, 98: 98, 99: 99, 100: 100, 101: 101, 102: 102, 103: 103, 104: 104, 105: 105, 106: 106, 107: 107, 108: 108, 109: 109, 110: 110, 111: 111, 112: 112, 113: 113, 114: 114, 115: 115, 116: 116, 117: 117, 118: 118, 119: 119, 120: 120, 121: 121, 122: 122, 123: 123, 124: 124, 125: 125, 126: 126, 127: 127, 1027: 129, 8225: 135, 1046: 198, 8222: 132, 1047: 199, 1168: 165, 1048: 200, 1113: 154, 1049: 201, 1045: 197, 1050: 202, 1028: 170, 160: 160, 1040: 192, 1051: 203, 164: 164, 166: 166, 167: 167, 169: 169, 171: 171, 172: 172, 173: 173, 174: 174, 1053: 205, 176: 176, 177: 177, 1114: 156, 181: 181, 182: 182, 183: 183, 8221: 148, 187: 187, 1029: 189, 1056: 208, 1057: 209, 1058: 210, 8364: 136, 1112: 188, 1115: 158, 1059: 211, 1060: 212, 1030: 178, 1061: 213, 1062: 214, 1063: 215, 1116: 157, 1064: 216, 1065: 217, 1031: 175, 1066: 218, 1067: 219, 1068: 220, 1069: 221, 1070: 222, 1032: 163, 8226: 149, 1071: 223, 1072: 224, 8482: 153, 1073: 225, 8240: 137, 1118: 162, 1074: 226, 1110: 179, 8230: 133, 1075: 227, 1033: 138, 1076: 228, 1077: 229, 8211: 150, 1078: 230, 1119: 159, 1079: 231, 1042: 194, 1080: 232, 1034: 140, 1025: 168, 1081: 233, 1082: 234, 8212: 151, 1083: 235, 1169: 180, 1084: 236, 1052: 204, 1085: 237, 1035: 142, 1086: 238, 1087: 239, 1088: 240, 1089: 241, 1090: 242, 1036: 141, 1041: 193, 1091: 243, 1092: 244, 8224: 134, 1093: 245, 8470: 185, 1094: 246, 1054: 206, 1095: 247, 1096: 248, 8249: 139, 1097: 249, 1098: 250, 1044: 196, 1099: 251, 1111: 191, 1055: 207, 1100: 252, 1038: 161, 8220: 147, 1101: 253, 8250: 155, 1102: 254, 8216: 145, 1103: 255, 1043: 195, 1105: 184, 1039: 143, 1026: 128, 1106: 144, 8218: 130, 1107: 131, 8217: 146, 1108: 186, 1109: 190}

function UnicodeToWin1251(s) {
  var L = []
  for (var i=0; i<s.length; i++) {
    var ord = s.charCodeAt(i)
    if (!(ord in DMap))
      throw "Character "+s.charAt(i)+" isn't supported by win1251!"
    L.push(String.fromCharCode(DMap[ord]))
  }
  return L.join('')
}

function base64_decode( data ) {	// Decodes data encoded with MIME base64
  //
  // +   original by: Tyler Akins (http://rumkin.com)

  var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var o1, o2, o3, h1, h2, h3, h4, bits, i=0, enc='';

  do {  // unpack four hexets into three octets using index points in b64
    h1 = b64.indexOf(data.charAt(i++));
    h2 = b64.indexOf(data.charAt(i++));
    h3 = b64.indexOf(data.charAt(i++));
    h4 = b64.indexOf(data.charAt(i++));

    bits = h1<<18 | h2<<12 | h3<<6 | h4;

    o1 = bits>>16 & 0xff;
    o2 = bits>>8 & 0xff;
    o3 = bits & 0xff;

    if (h3 == 64)	  enc += String.fromCharCode(o1);
    else if (h4 == 64) enc += String.fromCharCode(o1, o2);
    else			   enc += String.fromCharCode(o1, o2, o3);
  } while (i < data.length);

  return enc;
}

$(document).ready(function () {
  function equalize(){

    $('[equalizer]').each(function () { // делает колонки одинаковой высоты
      var max_height = 0;
      $(this).find('[equal]').each(function () {
        if($(this).height() > max_height){
          max_height = $(this).height();
        }
      });
      $(this).find('[equal]').each(function () {

        console.log($(this).attr('equal'));
        $(this).height(max_height);
      });
    });
  }

  setTimeout(equalize,100);

});

angular.module('bscBarcodeWarApp')
    .controller('HandlersCtrl', ['$scope','$routeParams', '$timeout', 'connector', 'handler','clipboard',function ($scope, $routeParams, $timeout, connector, handler, clipboard) {

      $scope.match = {
        match: false
      };

      try{
        var QueryString = function () {
          // This function is anonymous, is executed immediately and
          // the return value is assigned to QueryString!
          var query_string = {};
          var query = window.location.hash.split('?');
          query = query[1];
          var vars = query.split("&");
          for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            // If first entry with this name
            if (typeof query_string[pair[0]] === "undefined") {
              query_string[pair[0]] = decodeURIComponent(pair[1]);
              // If second entry with this name
            } else if (typeof query_string[pair[0]] === "string") {
              var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
              query_string[pair[0]] = arr;
              // If third or later entry with this name
            } else {
              query_string[pair[0]].push(decodeURIComponent(pair[1]));
            }
          }
          return query_string;
        }();
      }catch(e){
        QueryString = null;
      }

      $scope.terminalId = '';

      if(typeof QueryString != 'undefined' && QueryString != '' && QueryString != null){
        $scope.barcodeTest = QueryString.barcode || '';
        connector.send({
          method: 'post',
          path: '/bsc/barcode/rest/translate',
          data: {
            "encodedBarcode": $scope.barcodeTest
          },
          success: function (data) {
            $scope.barcodeText = data.data.strBarcode;
          },
          error: function (data) {
            $scope.responceStatus = 200;
            alertify.error("<h3 class='m-5'>"+data.status+"</h3><div>"+data.data+"</div>");
          }
        });
        $scope.terminalId = QueryString.terminal || '';
      }

      var editor = ace.edit("editor");
      editor.$blockScrolling = Infinity;
      var JavaScriptMode = ace.require("ace/mode/javascript").Mode;
      editor.session.setMode(new JavaScriptMode());
      editor.setTheme("ace/theme/eclipse");
      editor.selectAll();

      function handleFileSelect(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        var files = evt.dataTransfer.files; // FileList object.

        // files is a FileList of File objects. List some properties.
        for (var i = 0, f; f = files[i]; i++) {

          var reader = new FileReader();

          // Closure to capture the file information.
          reader.onload = (function(theFile) {
            return function(e) {
              // Render thumbnail.
              editor.selectAll();
              editor.insert(e.target.result);
              $scope.dropzone = false;
              $scope.copyVersion();
              $scope.$apply();
            };
          })(f);

          // Read in the image file as a data URL.
          reader.readAsText(f);

        }
      }
      function handleFileSelect1(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        var files = evt.dataTransfer.files; // FileList object.

        // files is a FileList of File objects. List some properties.
        for (var i = 0, f; f = files[i]; i++) {

          var reader = new FileReader();

          // Closure to capture the file information.
          reader.onload = (function(theFile) {
            return function(e) {
              // Render thumbnail.
              editor.selectAll();
              editor.insert(e.target.result);
              $scope.dropzone = false;
              $scope.$apply();
            };
          })(f);

          // Read in the image file as a data URL.
          reader.readAsText(f);

        }
      }

      function handleDragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
      }

      // Setup the dnd listeners.
      var dropZone = document.getElementById('drop_zone');
      dropZone.addEventListener('dragover', handleDragOver, false);
      dropZone.addEventListener('drop', handleFileSelect, false);
      // Setup the dnd listeners.
      var dropZone1 = document.getElementById('drop_zone1');
      dropZone1.addEventListener('dragover', handleDragOver, false);
      dropZone1.addEventListener('drop', handleFileSelect1, false);

      $scope.widerDetails = false;
      $scope.widerEditor = false;
      $scope.aloneResponceToggle = false;
      $scope.dropzone = false;

      $scope.$watch('widerEditor', function () {
        // editor.
      });

      $timeout(function () {
        editor.on("change", function(e){
          function declare(obj){
            try{
              $scope.match = obj.match('|', $scope.barcodeText);
              $scope.$apply();
            }catch(e){
              console.log('нет текста');
            }
          }
          // console.log(editor.getValue());
          try{
            var temptext = editor.getValue();
            eval(editor.getValue());
          }catch(e){

          }
        });
      });

      //editor.insert(defaultDeclare);

      $scope.copyVersion = function () { // ебучая тьма колбеков так надо! так правильно и круто! я просто переписываю дефолтные функции обработчиков
        var tempEditor = editor.getValue();
        $scope.newVersions({ // создаю новую версию
          success: function (data) {
            $scope.getHandler({ // получаю хандлер с новой версией
              handler_id: $routeParams.id,
              success: function (data) {
                $scope.versions = handler.getVersions(data);
                $scope.versionSelector = $scope.versions.versions[$scope.versions.versions.length-1]; // делаю последнюю версию активной
                $scope.versionSelector.body = tempEditor;
                editor.selectAll();
                editor.insert($scope.versionSelector.body);
                $scope.updateVersion({ // заполняю версию тем же кодом
                  success: function (data){}
                });
              }
            });
          }
        });
      };

      $scope.testAlone = function (obj) {

        obj = obj || {};
        obj.success = obj.success || function (data) {
            $scope.aloneResponceToggle = true;
            $scope.aloneResponce = data.data.handlerResponses;

            $scope.barcodeTest = $scope.barcodeTest || '';

            connector.send({
              method: 'post',
              path: '/bsc/barcode/rest/translate',
              data: {
                "encodedBarcode": $scope.barcodeTest
              },
              success: function (data) {
                $scope.barcodeText = data.data.strBarcode;
              },
              error: function (data) {
                $scope.responceStatus = 200;
                alertify.error("<h3 class='m-5'>"+data.status+"</h3><div>"+data.data+"</div>");
              }
            });

            function equalize(){

              $('[equalizer="panels"]').each(function () { // делает колонки одинаковой высоты
                var max_height = 0;
                $(this).find('[equal]').each(function () {
                  if($(this).height() > max_height){
                    max_height = $(this).height();
                  }
                });
                $(this).find('[equal]').each(function () {
                  console.log($(this).attr('equal'));
                  $(this).height(max_height);
                });
              });
            }

            setTimeout(equalize,1);

          };

        var aloneData = {
          "terminalId": $scope.terminalId,
          "encodedBarcode": $scope.barcodeTest,
          "handlerType": $scope.versions.type,
          "handlerBody": editor.getValue()
        };

        if($scope.versions.serviceId){
          aloneData.serviceId = $scope.versions.serviceId;
        }

        connector.send({
          method: 'post',
          path: '/bsc/barcode/rest/handlers/handler/'+$routeParams.id+'/version/'+$scope.versionSelector.version+'/test/alone', // зачем указывать версию?
          data: aloneData,
          success: obj.success
        });
      }

      $scope.testUnited = function (obj) {

        obj = obj || {};
        obj.success = obj.success || function (data) {
            $scope.aloneResponceToggle = true;
            $scope.aloneResponce = data.data.handlerResponses;
            $scope.barcodeTest = $scope.barcodeTest || '';

            function equalize(){

              $('[equalizer="panels"]').each(function () { // делает колонки одинаковой высоты
                var max_height = 0;
                $(this).find('[equal]').each(function () {
                  if($(this).height() > max_height){
                    max_height = $(this).height();
                  }
                });
                $(this).find('[equal]').each(function () {
                  console.log($(this).attr('equal'));
                  $(this).height(max_height);
                });
              });
            }

            setTimeout(equalize,1);

          };

        var aloneData = {
          "terminalId": $scope.terminalId,
          "encodedBarcode": $scope.barcodeTest,
          "handlerType": $scope.versions.type,
          "handlerBody": editor.getValue(),
          "testParams":{
            "ignoreSkipDefault":true
          }
        };

        if($scope.versions.serviceId){
          aloneData.serviceId = $scope.versions.serviceId;
        }

        connector.send({
          method: 'post',
          path: '/bsc/barcode/rest/handlers/handler/'+$routeParams.id+'/version/'+$scope.versionSelector.version+'/test/united', // зачем указывать версию?
          data: aloneData,
          success: obj.success
        });
      }

      $scope.deleteVersion = function () {
        console.log($scope.versionSelector);
        alertify.confirm("Вы уверены что хотите удалить версию №"+$scope.versionSelector.version,
          function(e){
            if (e) {
              connector.send({
                method: 'delete',
                path: '/bsc/barcode/rest/handlers/handler/'+$routeParams.id+'/version/'+$scope.versionSelector.version,
                success: function (data) {
                  console.log(data);
                  $scope.updateVersion();
                  alertify.error('Удалено!');
                }
              });
            } else {
              alertify.error('Ладно, НЕ удаляю!');
            }
          });
      }

      $scope.getHandler = function (obj) {

        obj = obj || {};
        var handler_id = obj.handler_id;
        obj.success = obj.success || function (data) {
          $scope.versions = handler.getVersions(data);

          if(!!$scope.versionSelector){
            for(var v in $scope.versions.versions){
              if($scope.versions.versions[v].version == $scope.versionSelector.version){
                $scope.versionSelector = $scope.versions.versions[v];
                break;
              }
            }
          }else{
            for(var v in $scope.versions.versions){
              if($scope.versions.versions[v].prodStatus.runtimeCode == "PRODUCTION"){
                $scope.versionSelector = $scope.versions.versions[v];
                break;
              }else{
                $scope.versionSelector = $scope.versions.versions[v];
              }
            }
          }
            $timeout(function() {
              $scope.updateSelect();
            });

        };

        connector.send({
          method: 'get',
          path: '/bsc/barcode/rest/handlers/handler/'+handler_id+'/versions',
          success: obj.success
        });
      };

      $scope.checkVersion = function (version) {
        if(isset(version)){
          if(version.prodStatus.runtimeCode == 'PRODUCTION' || version.devStatus.runtimeCode == 'TESTOK'){
            editor.setReadOnly(true);
          }else{
            editor.setReadOnly(false);
          }
        }
      };


      $scope.testFAIL = function () {
        connector.send({
          method: 'post',
          path: '/bsc/barcode/rest/handlers/handler/'+$routeParams.id+'/version/'+$scope.versionSelector.version+'/testFailed',
          success: function (data) {
            $scope.getHandler({handler_id: $routeParams.id});
          }
        });
      };

      $scope.testOK = function () {
        connector.send({
          method: 'post',
          path: '/bsc/barcode/rest/handlers/handler/'+$routeParams.id+'/version/'+$scope.versionSelector.version+'/testOk',
          success: function (data) {
            $scope.getHandler({handler_id: $routeParams.id});
          }
        });
      };

      $scope.newVersions = function (obj) {

        obj = obj || {};
        obj.success = obj.success || function (data) {
          $scope.getHandler({
            handler_id: $routeParams.id,
            success: function (data) {
              $scope.versions = handler.getVersions(data);
              $scope.versionSelector = $scope.versions.versions[$scope.versions.versions.length-1]; // делаю последнюю версию активной
              $scope.versionSelector.body = tempEditor;
            }
          });
        };

        connector.send({
          method: 'post',
          path: '/bsc/barcode/rest/handlers/handler/'+$routeParams.id+'/newVersion',
          success: obj.success
        });
      };

      $scope.versionToProd = function (obj) {
        obj = obj || {};
        obj.success = obj.success || function (data) {
          $scope.getHandler({handler_id: $routeParams.id});
        };
        connector.send({
          method: 'post',
          path: '/bsc/barcode/rest/handlers/handler/'+$routeParams.id+'/version/'+$scope.versionSelector.version+'/toProduction',
          success: obj.success
        });
      };

      $scope.revokeProduction = function () {

        connector.send({
          method: 'post',
          path: '/bsc/barcode/rest/handlers/handler/'+$routeParams.id+'/version/'+$scope.versionSelector.version+'/revokeProduction',
          success:
              function (data) {
                $scope.getHandler({handler_id: $routeParams.id});
              }
        });
      };
      $scope.updateVersion = function (obj) {

        obj = obj || {};
        obj.success = obj.success || function (data) {
          $scope.getHandler({handler_id: $routeParams.id});

        };

        connector.send({
          method: 'post',
          path: '/bsc/barcode/rest/handlers/handler/'+$routeParams.id+'/version/'+$scope.versionSelector.version,
          data: {
            "body": editor.getValue(),
            "description": $scope.versionSelector.description
          },
          success: obj.success
        });
      };

      $scope.$watch('versionSelector', function (data) {
        editor.selectAll();
        if(isset($scope.versionSelector)){
          editor.insert($scope.versionSelector.body);
        }
        $scope.checkVersion($scope.versionSelector);
      });

      $scope.updateSelect = function(){
        // console.log($scope.versions);
        for(var version in $scope.versions.versions){ // TODO изврат!!
          var temp = $scope.versions.versions[version];
          if(temp.del){
            $("option[label=\""+temp.version+'-'+temp.prodStatus.name+'-'+temp.devStatus.name+"\"]").addClass('text-danger');
          }
        }
      };

      $scope.checkTest = function (e) {
        if(e.keyCode == 13){
          e.preventDefault();
          $scope.testAlone();
        }
      }

      $scope.getHandler({handler_id: $routeParams.id});

      $scope.changeVersion = function (version) {
          console.log(123);
      }

    }]);
