'use strict';

var util = require('util')
  , ScriptBase = require('../script-base.js');

var FilterGenerator = module.exports = function () {
  ScriptBase.apply(this, arguments);
};

util.inherits(FilterGenerator, ScriptBase);

FilterGenerator.prototype.filterFile = function () {
  this.scriptTemplate('filter', 'filters/' + this.name);
};

FilterGenerator.prototype.updateFilters = function () {
  this.updateRequireFiles('filters/all', this.name);
};
