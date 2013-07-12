'use strict';

var util = require('util')
  , path = require('path')
  , yeoman = require('yeoman-generator');

var Generator = module.exports = function Generator() {
  yeoman.generators.NamedBase.apply(this, arguments);

  try {
    this.appName = require(path.join(process.cwd(), 'bower.json')).name;
  } catch (e) {
    this.appName = path.basename(process.cwd());
  }

  if (typeof this.jsPath === 'undefined') {
    this.jsPath = path.join(this.appName, 'static', 'js');
  }
};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.scriptTemplate = function (src, dest) {
  yeoman.generators.Base.prototype.template.apply(this, [
    src + '.js',
    path.join(this.jsPath, dest) + '.js'
  ]);
};

Generator.prototype.updateRequireFiles = function (src, name) {
  var srcpath = path.join(this.jsPath, src) + '.js'
    , content = this.readFileAsString(srcpath)
    , ctrls = content.match(/define\((\[[\s\S]*?.*\])\);/);

  ctrls = JSON.parse(ctrls[1]);
  ctrls.push('.' + path.sep + name);
  var defines = JSON.stringify(this._.uniq(ctrls), null, 2);
  content = content.replace(/define\(\[[\s\S]*?.*\]\);/, 'define(' + defines + ');');
  this.writeFileFromString(content, srcpath);
};
