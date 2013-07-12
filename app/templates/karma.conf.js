// Karma configuration


// base path, that will be used to resolve files and exclude
basePath = '';


// list of files / patterns to load in the browser
files = [
  '<%= appName %>/static/bower_components/jquery/jquery.js',
  '<%= appName %>/static/bower_components/angular/angular.js',
  '<%= appName %>/static/bower_components/angular-resource/angular-resource.js',
  '<%= appName %>/static/bower_components/angular-cookies/angular-cookies.js',
  '<%= appName %>/static/bower_components/angular-mocks/angular-mocks.js',
  'node_modules/chai/chai.js',
  'node_modules/sinon/pkg/sinon.js',
  MOCHA,
  MOCHA_ADAPTER,
  REQUIRE,
  REQUIRE_ADAPTER,

  {pattern: '<%= appName %>/static/js/**/*.js', included: false},

  '<%= appName %>/tests/js/test-main.js'
];


// list of files to exclude
exclude = [
  
];


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['progress'];


// web server port
port = 9876;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['PhantomJS'];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;
