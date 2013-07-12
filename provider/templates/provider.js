'use strict';

define(['angular'], function(angular) {
  angular.module('<%= _.camelize(appName) %>').provider('<%= _.camelize(name) %>', function () {
    var someValue = 'someValue';

    function SomeClass() {
      this.say = function () {
        return someValue;
      };
    }

    this.someApi = function (v) {
      someValue = v;
    };

    this.$get = function () {
      return new SomeClass();
    };
  });
});
