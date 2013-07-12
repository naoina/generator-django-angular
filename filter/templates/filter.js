'use strict';

define(['angular'], function(angular) {
  angular.module('<%= _.camelize(appName) %>').filter('<%= _.camelize(name) %>', function () {
    return function (input) {
      return '<%= _.camelize(name) %> filter: ' + input;
    };
  });
});
