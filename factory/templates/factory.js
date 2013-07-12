'use strict';

define(['angular'], function(angular) {
  angular.module('<%= _.camelize(appName) %>').factory('<%= _.camelize(name) %>', function () {
    var someValue = 'someValue';

    return {
      someMethod: function () {
        return someValue;
      }
    };
  });
});
