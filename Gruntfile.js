/*jshint camelcase:false */
/*
 * Grunt Closure Tools
 * https://github.com/closureplease/grunt-closure-tools
 *
 * Copyright (c) 2013 Thanasis Polychronakis
 * Licensed under the MIT license.
 */


var closureTools  = require('./tasks/closureTools'),
    ssCompiler    = require('superstartup-closure-compiler'),
    cTools        = require('closure-tools');


module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // initialize the tasks manually.
  closureTools(grunt);

  // Project configuration.
  grunt.initConfig({

    closureDepsWriter: {
      options: {
        depswriter: cTools.getPath( 'build/depswriter.py' ),
        root: 'test/case/'
      },
      testCase: {
        dest: 'temp/deps.js'
      }
    },
   closureBuilder:  {
      options: {
        builder: cTools.getPath('build/closurebuilder.py'),
        // This is required if you set the option "compile" to true.
        compilerFile: ssCompiler.getPathSS(),
        inputs: 'test/case/js/app.js'

      },

      // any name that describes your operation
      testCaseBundle: {
        options: {
          output_mode: 'script',
          compile: false // boolean
        },
        src: ['test/case/js/', 'test/case/closureMock'],
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
        src: ['test/case/js/', 'test/case/closureMock'],
        dest: 'temp/build.compiled.js'
      }
    },
    closureCompiler: {
      options: {
        compilerFile: ssCompiler.getPathSS(),
        compilerOpts: {
          compilation_level: 'ADVANCED_OPTIMIZATIONS',
          warning_level: 'verbose',
          externs: 'test/case/externs.js',
          summary_detail_level: 3,
          output_wrapper: '"(function(){%output%}).call(this);"'
        }
      },
      testCase: {
        src: 'temp/build.bundled.js',
        dest: 'temp/compiler.compiled.js'
      },
      testCaseNoSrc: {
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
    },
    nodeunit: {
      all: [
        // all lib tests
        'test/{builder,compiler,depsWriter}/**/*.js',
        // grunt task tests
        'test/*.js'
      ]
    }
  });

  // "npm test" runs these tasks,
  // run all the build tasks first.
  grunt.registerTask( 'test', [
    'closureDepsWriter:testCase',
    'closureBuilder:testCaseBundle',
    'closureBuilder:testCaseCompile',
    'closureCompiler:testCase',
    // not ready yet
    //'closureCompiler:testCaseNoSrc',
    'nodeunit']);

  grunt.registerTask('default', ['test']);

};
