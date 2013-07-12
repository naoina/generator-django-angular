'use strict';
var util = require('util')
  , path = require('path')
  , yeoman = require('yeoman-generator');

function generateRandomString(maxLength, chars) {
  var chars = chars || 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)'
    , charsLength = chars.length
    , randomBytes = require('crypto').randomBytes(maxLength)
    , result = [];

  for (var i = 0, len = randomBytes.length; i < len; ++i) {
    result.push(chars[randomBytes[i] % charsLength]);
  }

  return result.join('');
}


yeoman.generators.Base.prototype.pipInstall = function (paths, options, cb) {
  return this.runInstall('pip', paths, options, cb);
};


var DjangoAngularGenerator = module.exports = function (args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({
      skipInstall: options['skip-install'],
      callback: function() {
        this.pipInstall(null, {
          requirement: 'requirements.txt'
        }, function() {
          this.log
            .info("Deploy user is '%s'", this.deployAccount.bold)
            .info("Admin account is '%s'", this.adminAccount.bold)
            .info("Admin is '" + "%s <%s>".bold + "'", this.adminName, this.adminEmail)
            .info("DB account is '%s'", this.dbAccount.bold)
            .info("DB password is '%s'", this.dbPassword.bold)
            .write()
            .info("Please run the `" + "python manage.py syncdb --migrate".bold + "` command for initial setup.");
        }.bind(this));
      }.bind(this)
    });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(DjangoAngularGenerator, yeoman.generators.Base);

DjangoAngularGenerator.prototype.askFor = function () {
  var cb = this.async()
    , defaultDBAccount = "Same as project name"
    , defaultDBPassword = "Generate random password"
    , defaultDeployAccount = "Same as admin account";

  var prompts = [{
    type: 'input',
    name: 'appName',
    message: "Please enter the project name"
  }, {
    type: 'input',
    name: 'adminAccount',
    message: "Please enter the admin account"
  }, {
    type: 'input',
    name: 'adminName',
    message: "Please enter the admin name"
  }, {
    type: 'input',
    name: 'adminEmail',
    message: "Please enter the admin email"
  }, {
    type: 'input',
    name: 'deployHost',
    message: "Please enter the deploy host"
  }, {
    type: 'input',
    name: 'deployAccount',
    message: "Please enter the deploy account",
    'default': defaultDeployAccount
  }, {
    type: 'input',
    name: 'dbAccount',
    message: "Please enter the database account",
    'default': defaultDBAccount
  }, {
    type: 'input',
    name: 'dbPassword',
    message: "Please enter the database password",
    'default': defaultDBPassword
  }];

  this.prompt(prompts, function (props) {
    var passwordChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    this.appName = props.appName;
    this.jsPath = path.join(props.appName, 'static', 'js');
    this.adminAccount = props.adminAccount;
    this.adminName = props.adminName;
    this.adminEmail = props.adminEmail;
    this.deployHost = props.deployHost;
    this.deployAccount = props.deployAccount === defaultDeployAccount ? this.adminAccount : props.deployAccount;
    this.dbAccount = props.dbAccount === defaultDBAccount ? this.appName : props.dbAccount;
    this.dbPassword = props.dbPassword === defaultDBPassword ? generateRandomString(20, passwordChars) : props.dbPassword;

    cb();
  }.bind(this));
};

DjangoAngularGenerator.prototype.app = function () {
  this.template('package.json', 'package.json');
  this.template('bower.json', 'bower.json');
  this.template('_bowerrc', '.bowerrc');
  this.template('Gruntfile.js', 'Gruntfile.js');
  this.template('karma.conf.js', 'karma.conf.js');
};

DjangoAngularGenerator.prototype.appDjango = function () {
  var sourceRoot = this.sourceRoot()
    , destinationRoot = this.destinationRoot()
    , djangoDir = path.join(sourceRoot, 'django');

  this.secretKey = generateRandomString(50);

  this.copy('requirements.txt', 'requirements.txt');
  this.copy('runtests.py', 'runtests.py');
  this.template('pytest.ini', 'pytest.ini');
  this.template('manage.py', 'manage.py');
  this.expandFiles('fabfile/**/*.py', {cwd: sourceRoot}).forEach(function(source) {
    this.template(source, path.join(destinationRoot, source));
  }.bind(this));
  this.expandFiles('**', {cwd: djangoDir}).forEach(function(source) {
    var src = path.join(djangoDir, source)
      , dest = path.join(this.appName, source);
    this.template(src, dest);
  }.bind(this));
};

DjangoAngularGenerator.prototype.projectfiles = function () {
  this.copy('_jshintrc', '.jshintrc');
  this.copy('Vagrantfile', 'Vagrantfile');
  this.template('_gitignore', '.gitignore');
};

DjangoAngularGenerator.prototype.ansibleFiles = function () {
  var sourceRoot = this.sourceRoot()
    , destinationRoot = this.destinationRoot();

  this.expandFiles('ansible/**', {cwd: sourceRoot}).forEach(function(source) {
    this.template(source, path.join(destinationRoot, source));
  }.bind(this));
};

DjangoAngularGenerator.prototype.gitInit = function () {
  this.spawnCommand('git', ['init']);
};
