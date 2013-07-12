'use strict';

var util = require('util')
  , ScriptBase = require('../script-base.js');

var ServiceGenerator = module.exports = function () {
  ScriptBase.apply(this, arguments);
};

util.inherits(ServiceGenerator, ScriptBase);

ServiceGenerator.prototype.serviceFile = function () {
  this.scriptTemplate('service', 'services/' + this.name);
};

ServiceGenerator.prototype.updateServices = function () {
  this.updateRequireFiles('services/all', this.name);
};
