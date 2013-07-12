'use strict';

var util = require('util')
  , ScriptBase = require('../script-base.js');

var FactoryGenerator = module.exports = function () {
  ScriptBase.apply(this, arguments);
};

util.inherits(FactoryGenerator, ScriptBase);

FactoryGenerator.prototype.factoryFile = function () {
  this.scriptTemplate('factory', 'services/' + this.name);
};

FactoryGenerator.prototype.updateServices = function () {
  this.updateRequireFiles('services/all', this.name);
};
