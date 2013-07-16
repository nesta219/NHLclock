'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: {
        name : 'NHLclock',
        version : '1.0',
        author: 'Michael Nesta'
    },
    clean: {
      files: ['dist/NHLclock.js', 'dist/styles.css']
    },
    concat: {
      dist: {
        src: ['assets/src/NHLClockWidget.js',
              'assets/src/NHLClockView.js'],
        dest: 'dist/NHLClockWidget.js'
      },
    },
    less : {
            build : {
                options : {
                    paths : ["styles"]
                },
                files : {
                    "dist/styles.css" : "assets/styles/styles.less"
                }
            }
        }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task.
  grunt.registerTask('default', ['clean', 'concat', 'less']);

};
