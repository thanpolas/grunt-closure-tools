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
        root: 'test/case/'
      },
      testCase: {
        dest: 'temp/deps.js'
      }
    },
   closureBuilder:  {
      options: {
        closureLibraryPath: 'closure-library',
        // This is required if you set the option "compile" to true.
        compilerFile: 'build/closure_compiler/compiler.jar',
        inputs: 'test/case/js/app.js'

      },

      // any name that describes your operation
      testCaseBundle: {
        options: {
          output_mode: 'script',
          compile: false // boolean
        },
        src: ['test/case/', 'closure-library'],
        dest: 'temp/build.bundled.js'
      },
      testCaseCompile: {
        options: {
          output_mode: 'compile',
          compile: true,
          compilerOpts: {
            compilation_level: 'ADVANCED_OPTIMIZATIONS',
            warning_level: 'verbose',
            externs: 'test/case/externs.js',
            summary_detail_level: 3,
            output_wrapper: '(function(){%output%}).call(this);'
          }
        },
        src: ['test/case/', 'closure-library'],
        dest: 'temp/build.compiled.js'
      }
    },
    closureCompiler: {
      options: {
        compilerFile: 'build/closure_compiler/compiler.jar',
        compilerOpts: {
          compilation_level: 'ADVANCED_OPTIMIZATIONS',
          warning_level: 'verbose',
          externs: 'test/case/externs.js',
          summary_detail_level: 3,
          output_wrapper: '(function(){%output%}).call(this);'
        }
      },
      testCase: {
        src: 'temp/build.bundled.js',
        dest: 'temp/compiler.compiled.js'
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
