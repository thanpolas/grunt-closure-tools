/**
 * Copyright 2012 Thanasis Polychronakis. Some Rights Reserved.
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
var fs = require('fs');

// path to depswritter from closure lib path
var DEPSWRITTER = '/closure/bin/build/depswriter.py';

module.exports = function(grunt) {
  grunt.registerMultiTask('closureDepsWriter', 'Google Closure Library Dependency Calculator script', function() {

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
    grunt.helper('executeCommand', command, done);

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
  var depswriter;
  if (!lib) {
    // check for direct assignment of depswriter script
    depswriter = data.depswriter;
    if (!depswriter) {
      grunt.log.error('ERROR'.red + ' :: ' + 'closureLibraryPath'.red + ' or ' + 'depswriter'.red + ' properties are required');
      return false;
    }
  } else {
    depswriter = lib + DEPSWRITER;
  }

  // ---
  // check depswriter existence
  // ---
  var fileExists = false;
  try {
      if (fs.lstatSync(depswriter).isFile()) {
        fileExists = true;
      }
  }
  catch (e) {}
  if (!fileExists) {
    grunt.log.error('ERROR'.red + ' :: depswriter file/path not valid: ' + depswriter);
    return false;
  }

  // ---
  // Check for inputs or paths
  // ---
  var paths = grunt.file.expandFiles(data.paths);
  var inputs = data.inputs;
  if (0 === paths.length && !inputs) {
    grunt.log.error('ERROR'.red + ' :: ' + 'paths'.red + ' or ' + 'inputs'.red +
    ' properties are required');
    return false;
  }

  // prep and return params object
  return {
    depswriter: depswriter,
    paths: paths,
    inputs: inputs
  };

};


/**
 * Prepare and compile the depswriter command we will execute
 *
 * @param {grunt} grunt
 * @param {Object} params
 * @param {Object} data
 * @return {string|boolean} boolean false if we failed, command string if all ok
 */
function compileCommand(grunt, params, data)
{
  var cmd = params.depswriter + ' ';

  // check type of operation first
  var op = data.options.output_mode || 'deps';

  if ('deps' == op) {
    // in case of deps mode, then add the -d flag by default
    // use the JS Source folder by default or if option
    // explicitly set use that
    var deps = data.options.deps;
    if (deps && deps.length) {
      cmd += grunt.helper('stringOrArray', deps, '-d');
    } else {
        grunt.log.error('ERROR'.red + ' :: For "deps" type of operation, option ' +
         'deps'.red + ' is required');
        return false;

    }
  }
  // check for paths
  if (params.paths && params.paths.length) {
    cmd += grunt.helper('stringOrArray', params.paths, '-p');
  }
  // check for inputs
  if (params.inputs && params.inputs.length) {
    cmd += grunt.helper('stringOrArray', params.inputs, '-i');
  }

  // set operation
  cmd += ' -o ' + op;

  // check if output file is defined
  if (data.options.output_file && data.options.output_file.length) {
    cmd += ' --output_file=' + data.options.output_path;
  }

  return cmd;
};

