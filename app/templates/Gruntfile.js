'use strict';

module.exports = function (grunt) {
  var pkg = {
    appName: '<%= appName %>',
    jsPath: '<%= jsPath %>',
    repository: '.',
    branch: 'master',
    distdir: 'dist'
  };

  grunt.initConfig({
    pkg: pkg,

    exec: {
      dist: {
        cmd: 'git clone -b <%%= pkg.branch %> --recursive <%%= pkg.repository %> <%%= pkg.distdir %>'
      },
      dist_bower_install: {
        cwd: '<%%= pkg.distdir %>',
        cmd: 'bower install --production'
      }
    },

    ngmin: {
      dist: {
        expand: true,
        cwd: '<%%= pkg.distdir %>/<%%= pkg.jsPath %>',
        src: [
          '**/*.js',
          '!app.build.js'
        ],
        dest: '<%%= pkg.distdir %>/<%%= pkg.jsPath %>'
      }
    },

    clean: {
      dist: ['<%%= pkg.distdir %>']
    }
  });

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', []);
  grunt.registerTask('dist', [
    'clean:dist',
    'exec:dist',
    'exec:dist_bower_install',
    'ngmin'
  ]);
};
