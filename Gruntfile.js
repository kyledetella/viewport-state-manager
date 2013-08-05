// Generated on 2013-08-05 using generator-stamp 0.8.1
'use strict';

module.exports = function (grunt) {
  /**
   * Initialize Grunt configurations
   * 
   */
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        preserveComments: false,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      my_target: {
        files: {
          'viewportStateManager.min.js': ['viewportStateManager.js']
        }
      }
    }
  });


  //
  // Define default task
  // 
  grunt.registerTask('default', 'uglify');

  //
  // Load NPM Tasks and plugins
  // 
  grunt.loadNpmTasks('grunt-contrib-uglify');
};