/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('django-angular generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('django-angular:app', [
        '../../app',
        '../../controller'
      ]);
      this.app.options['skip-install'] = true;
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      '.git',
      '.gitignore',
      '.bowerrc',
      '.jshintrc',
      'package.json',
      'bower.json',
      'Gruntfile.js',
      'karma.conf.js',
      'Vagrantfile',
      'requirements.txt',
      'runtests.py',
      'pytest.ini',
      'manage.py',
      'fabfile/__init__.py',
      'fabfile/gunicorn.py',
      'testAppName/__init__.py',
      'testAppName/context_processors.py',
      'testAppName/forms.py',
      'testAppName/models.py',
      'testAppName/urls.py',
      'testAppName/views.py',
      'testAppName/wsgi.py',
      'testAppName/migrations/__init__.py',
      'testAppName/migrations/0001_initial.py',
      'testAppName/settings/__init__.py',
      'testAppName/settings/base.py',
      'testAppName/settings/development.py',
      'testAppName/settings/production.py',
      'testAppName/settings/staging.py',
      'testAppName/static/apple-touch-icon-precomposed-144x144.png',
      'testAppName/static/favicon.ico',
      'testAppName/static/css/main.css.scss',
      'testAppName/static/js/app.build.js',
      'testAppName/static/js/init.js',
      'testAppName/static/js/main.js',
      'testAppName/static/js/controllers/all.js',
      'testAppName/static/js/directives/all.js',
      'testAppName/static/js/filters/all.js',
      'testAppName/static/js/services/all.js',
      'testAppName/templates/_base.html',
      'testAppName/templates/index.html',
      'testAppName/tests/test_forms.py',
      'testAppName/tests/test_models.py',
      'testAppName/tests/test_views.py',
      'testAppName/tests/js/test-main.js',
      'ansible/playbook.yml',
      'ansible/appservers.yml',
      'ansible/dbservers.yml',
      'ansible/webservers.yml',
      'ansible/production',
      'ansible/staging',
      'ansible/group_vars/all',
      'ansible/group_vars/appservers',
      'ansible/group_vars/dbservers',
      'ansible/host_vars/192.168.33.33',
      'ansible/roles/app/handlers/main.yml',
      'ansible/roles/app/tasks/main.yml',
      'ansible/roles/app/tasks/devel.yml',
      'ansible/roles/app/tasks/git.yml',
      'ansible/roles/app/tasks/nginx.yml',
      'ansible/roles/app/tasks/nodejs.yml',
      'ansible/roles/app/tasks/virtualenv.yml',
      'ansible/roles/app/templates/nginx.conf',
      'ansible/roles/common/files/RPM-GPG-KEY-EPEL-6',
      'ansible/roles/common/files/epel.repo',
      'ansible/roles/common/tasks/main.yml',
      'ansible/roles/db/handlers/main.yml',
      'ansible/roles/db/tasks/main.yml',
      'ansible/roles/db/templates/pg_hba.conf',
      'ansible/roles/db/templates/pg_ident.conf',
      'ansible/roles/postgresql/tasks/main.yml',
      'ansible/roles/web/files/iptables-save',
      'ansible/roles/web/handlers/main.yml',
      'ansible/roles/web/tasks/iptables.yml',
      'ansible/roles/web/tasks/main.yml'
    ];

    helpers.mockPrompt(this.app, {
      appName: 'testAppName',
      adminAccount: 'testAdminAccount',
      adminName: 'testAdminName',
      adminEmail: 'testAdminEmail',
      deployHost: 'testDeployHost',
      deployAccount: 'testDeployAccount',
      dbAccount: 'testDbAccount',
      dbPassword: 'testDbPassword'
    });
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

  describe("Controller", function() {
    it("should generate a new controller of angular", function(done) {
      helpers.mockPrompt(this.app, {
        appName: 'testAppName',
        adminAccount: 'testAdminAccount',
        adminName: 'testAdminName',
        adminEmail: 'testAdminEmail',
        deployHost: 'testDeployHost',
        deployAccount: 'testDeployAccount',
        dbAccount: 'testDbAccount',
        dbPassword: 'testDbPassword'
      });

      this.app.run({}, function () {
        var controller = helpers.createGenerator('django-angular:controller', [
          '../../controller'
        ], ['foo_bar']);

        controller.run([], function () {
          helpers.assertFiles([
            ['testAppName/static/js/controllers/foo_bar.js', /controller\('FooBarCtrl'/],
            ['testAppName/static/js/controllers/all.js', /"\.\/foo_bar"/]
          ]);
          done();
        });
      });
    });
  });
});
