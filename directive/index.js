'use strict';

var util = require('util')
  , ScriptBase = require('../script-base.js');

var DirectiveGenerator = module.exports = function () {
  ScriptBase.apply(this, arguments);
};

util.inherits(DirectiveGenerator, ScriptBase);

DirectiveGenerator.prototype.controllerFile = function () {
  this.scriptTemplate('directive', 'directives/' + this.name);
};

DirectiveGenerator.prototype.updateDirectives = function () {
  this.updateRequireFiles('directives/all', this.name);
};
