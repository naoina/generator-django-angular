'use strict';
var util = require('util')
  , ScriptBase = require('../script-base.js');

var ProviderGenerator = module.exports = function () {
  ScriptBase.apply(this, arguments);
};

util.inherits(ProviderGenerator, ScriptBase);

ProviderGenerator.prototype.providerFile = function () {
  this.scriptTemplate('provider', 'services/' + this.name);
};

ProviderGenerator.prototype.updateServices = function () {
  this.updateRequireFiles('services/all', this.name);
};
