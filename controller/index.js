'use strict';

var util = require('util')
  , ScriptBase = require('../script-base.js');

var ControllerGenerator = module.exports = function () {
  ScriptBase.apply(this, arguments);
};

util.inherits(ControllerGenerator, ScriptBase);

ControllerGenerator.prototype.controllerFile = function () {
  this.scriptTemplate('controller', 'controllers/' + this.name);
};

ControllerGenerator.prototype.updateControllers = function () {
  this.updateRequireFiles('controllers/all', this.name);
};
