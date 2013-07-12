'use strict';

define([
  'jquery',
  'angular',
  'controllers/all',
  'directives/all',
  'filters/all',
  'services/all'
], function($, angular) {
  function initialize() {
    var app = angular.module('<%= appName %>', []);

    app.config(function($interpolateProvider) {
      $interpolateProvider.startSymbol('{$');
      $interpolateProvider.endSymbol('$}');
    });

    $(function() {
      angular.bootstrap(document, [app.name]);
    });
  }  // End of initialize()

  return initialize;
});
