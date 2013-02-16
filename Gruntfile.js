/*jshint camelcase:false */
/*
 * Grunt Closure Tools
 * https://github.com/thanpolas/grunt-closure-tools
 *
 * Copyright (c) 2013 Thanasis Polychronakis
 * Licensed under the MIT license.
 */


var closureTools = require('./tasks/closureTools');


module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // initialize the tasks manually.
  closureTools(grunt);

  // Project configuration.
  grunt.initConfig({

    nodeunit: {
      all: ['test/{builder,compiler,depsWriter}/**/*.js']
    },


    closureDepsWriter: {
      options: {
        closureLibraryPath: 'closure-library',
        root: 'test/todoApp/'
      },
      todoApp: {
        //src: 'test/todoApp/',
        dest: 'test/todoApp/deps.js'
      }
    },
   closureBuilder:  {
      options: {
        closureLibraryPath: 'closure-library',
        // This is required if you set the option "compile" to true.
        compilerFile:           'build/closure_compiler/compiler.jar'
      },

      // any name that describes your operation
      testCase: {
        options: {
          output_mode:        'script',
          // [OPTIONAL] if we want builder to perform compile
          compile:            false // boolean
        },
        src: ['test/case/', 'closure-library']
      },

      readyjs: {
        options: {
          inputs: ['test/ready.js/lib/ready.export.js'],
          namespaces: ['ss.ready', 'ss.ready.compiled'],
          compile: true,
          compilerOpts: {
            compilation_level: 'ADVANCED_OPTIMIZATIONS',
            define: ['\'goog.DEBUG=false\'', '\'ss.STANDALONE=true\''],
            externs: 'test/ready.js/build/node.extern.js',
            warning_level: 'verbose',
            summary_detail_level: 3,
            output_wrapper: '(function(){%output%}).call(this);'
          }
        },
        src: ['test/ready.js/lib/', 'closure-library'],
        dest: 'temp/ready.js'
      }

    },

    watch: {
      test: {
        files: [
          'test/{builder,compiler,depsWriter}/**/*.js',
          'tasks/**/*.js'
        ],
        tasks: ['test']
      },
      builder: {
        files: ['tasks/*.js'],
        tasks: ['closureBuilder:readyjs']
      },
      depsWriter: {
        files: ['tasks/*.js'],
        tasks: ['closureDepsWriter:todoApp']
      }
    }
  });

  // "npm test" runs these tasks
  grunt.registerTask('test', ['nodeunit']);

};
