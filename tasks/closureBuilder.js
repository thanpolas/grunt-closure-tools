/**
 * Copyright 2012 Thanasis Polychronakis.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * =======================
 *
 * closureBuilder.js Combines and optionally compiles javascript files
 *
 * Call from grunt as:
 */
 var gruntConfig = {
   closureBuilder:  {
     // any name that describes your operation
     targetName: {
       // [Required] To find the builder executable we need either the path to
       //    closure library or directly the filepath to the builder:
       closureLibraryPath: 'path/to/closure-library', // path to closure library
       builder: 'path/to/closurebuilder.py', // filepath to builder

       // [Required] One of the two following options are required:
       inputs: 'string|Array', // input files (can just be the entry point)
       namespaces: 'string|Array', // namespaces

       // [Optional] paths to be traversed to build the dependencies
       root: 'string|Array',

       // [Optional] if not set, will output to stdout
       output_file: '',

       // [Optional] output_mode can be 'list', 'script' or 'compiled'.
       //    If compile is set to true, 'compiled' mode is enforced
       output_mode: '',

       // [Optional] if we want builder to also compile
       compile: false, // boolean
       compiler: '', // the location of the compiler.jar
       compiler_options: {
         /**
          * Go wild here...
          * any key will be used as an option for the compiler
          * value can be a string or an array
          * If no value is required use null
          */
       }
     }
   }
 };



var fs = require('fs');

// path to builder from closure lib path
var BUILDER = '/closure/bin/build/closurebuilder.py';

// Lets us know if we'll also compile
var compile = false;

// if we have an output file, we also set it to this var
var output_file = false;
module.exports = function(grunt) {
  grunt.registerMultiTask('closureBuilder', 'Google Closure Library builder', function closureBuild() {

    var data = this.data;
    var done = this.async();

    //
    // Validations
    // - Check required parameters
    //
    var params = validate(grunt, data);
    if (false === params) {
      return false;
    }

    //
    // Prepare and compile the command string we will execute
    //
    var command = compileCommand(grunt, params, data);

    if (false === command) {
      return false;
    }

    // execute the task
    grunt.helper('executeCommand', command, function executeCommand(status){

      if (compile && status && output_file) {
        grunt.helper('generateStats', output_file);
        done(true);
      } else {
        done(status);
      }
    });

  });

};

/**
 * Perform validations for given options
 *
 * @return {boolean|Object} false if error
 */
function validate(grunt, data)
{
  // check for closure lib path
  var lib = data.closureLibraryPath;
  var builder;
  if (!lib) {
    // check for direct assignment of builder script
    builder = data.builder;
    if (!builder) {
      grunt.log.error('ERROR'.red + ' :: ' + 'closureLibraryPath'.red + ' or ' + 'builder'.red + ' properties are required');
      return false;
    }
  } else {
    builder = lib + BUILDER;
  }

  builder = grunt.file.expandFiles(builder).shift();

  // ---
  // validate builder existence
  // ---
  if (!grunt.helper('fileExists', builder)) {
    grunt.log.error('ERROR'.red + ' :: builder file/path not valid: ' + builder.red);
    return false;
  }

  // ---
  // Check for inputs or paths
  // ---
  var inputs = grunt.file.expandFiles(data.inputs);
  var namespaces = data.namespaces;
  if (0 === inputs.length && !namespaces) {
    grunt.log.error('ERROR'.red + ' :: ' + 'inputs'.red + ' or ' + 'namespaces'.red +
    ' properties are required');
    return false;
  }

  var root = data.root;
  if (!root || 0 === root.length) {
    grunt.log.error('ERROR'.red + ' :: ' + 'root'.red + ' property is required');
    return false;
  }

  // prep and return params object
  return {
    builder: builder,
    inputs: inputs,
    namespaces: namespaces,
    root: root
  };

}


/**
 * Prepare and compile the builder command we will execute
 *
 * @param {grunt} grunt
 * @param {Object} params
 * @param {Object} data
 * @return {string|boolean} boolean false if we failed, command string if all ok
 */
function compileCommand(grunt, params, data)
{
  var cmd = params.builder + ' ';

  // check for inputs
  if (params.inputs && params.inputs.length) {
    cmd += grunt.helper('makeParam', params.inputs, '-i', false, true);
  }
  // check for namespaces
  if (params.namespaces && params.namespaces.length) {
    cmd += grunt.helper('makeParam', params.namespaces, '-n');
  }

  // append root
  cmd += grunt.helper('makeParam', params.root, '--root=', true, true);
  // check type of operation
  var op = data.output_mode || 'list';

  // see if we have compiler set, will override any operation
  if (data.compile) {
    // we got something, check if file is there...
    if (!grunt.helper('fileExists', data.compiler)) {
      grunt.log.error('ERROR'.red + ' :: compiler .jar location not valid: ' + data.compiler.red);
      return false;
    }

    // alright, we are compile on
    compile = true;
    op = 'compiled';
  }

  // set operation
  cmd += ' -o ' + op;

  // check if output file is defined
  if (data.output_file && data.output_file.length) {
    output_file = grunt.template.process(data.output_file);
    cmd += ' --output_file=' + output_file;
  }

  // ---
  // if compile mode, start digging
  // ---
  if (compile) {
    cmd += ' --compiler_jar=' + data.compiler;
    // dive into all options
    var opts = data.compiler_options;
    // define options that may contain files that need expanding
    var expandDirectives = [
      'externs'
    ];
    for(var directive in opts) {
      // check for externs option and intercept with grunt file expand
      if (0 <= expandDirectives.indexOf(directive)) {
        opts[directive] = grunt.file.expandFiles(opts[directive]);
      }

      // check for type of value and act accordingly
      if (Array.isArray(opts[directive])) {
        // go through all values
        for (var i = 0, l = opts[directive].length; i < l; i++) {
          cmd += ' --compiler_flags="--' + directive + '=' + opts[directive][i] + '"';
        }
      } else if (null === opts[directive]) {
        // value of directive is null, not required
        cmd += ' --compiler_flags="--' + directive + '"';
      } else {
        // value of directive is a string
        cmd += ' --compiler_flags="--' + directive + '=' + opts[directive] + '"';
      }

    }
  }

  return cmd;
}
