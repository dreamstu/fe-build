'use strict';
module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  var config = {
    dest:'/home/johnkim/Documents/svn/working/static/debug/marketing-static/crm/pc/js'
  }

  grunt.initConfig({
    seabuild: {
      options: {
        id: 'modules',
        //uglify:false
        // more http://lisperator.net/uglifyjs/compress
        uglify: {
          min: true,
          options: {
            global_defs: {
              DEBUG: true
            }
          },
          output: {
            beautify: false
          }
        }
      },
      main: {
        expand: true,
        cwd: './',
        src: ['src/**/*.js', 'index.js'],
        dest: config.dest
      }
    }
  });
  grunt.registerTask('default', ['seabuild']);
}
