/*global requirejs, angular, jQuery*/
'use strict';

define('angular', function() { return angular; });
define('jquery', function() { return jQuery; });

requirejs.config({
  paths: {}
});

require(['init'], function(initialize) {
  initialize();
});
