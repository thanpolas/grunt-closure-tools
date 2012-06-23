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
var gruntConfig = {
  closureDepsWriter: {
   targetName: {
     // To find the depswritter executable we need either the path to
     // closure library or directly the filepath to the depswritter:
     closureLibraryPath: 'path/to/closure-library', // path to closure library
     depswritter: 'path/to/closurebuilder.py', // filepath to depswriter
     
     // optionally set file targets. Can be a string, array or 
     // grunt base syntax (<config:...> or *)
     files: 'path/to/awesome.js',
     
     output_file: '', // if not set, will output to stdout
     options: {
       // pass any directive to the depswritter executable. 
       // There are only three possible options so here they are:
       
       // root directory to scan. Can be string or array
       root: ['source/ss', 'source/closure-library', 'source/showcase'],
       
       // root with prefix takes a pair of strings separated with a space, 
       // so proper way to use it is to suround with quotes.
       // can be a string or array
       root_with_prefix: '"source/ss ../.."',
       
       // string or array
       path_with_depspath: ''
     }
   }
 } 
}; 
 
 
var fs = require('fs');

// path to depswritter from closure lib path
var DEPSWRITER = '/closure/bin/build/depswriter.py';

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
    
    console.log('Out');

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

  // prep and return params object
  return {
    depswriter: depswriter
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

  // ---
  // Check for file targets...
  // ---
  var files = grunt.file.expandFiles(data.files || '');
  for (var i = 0, l = files.length; i < l; i++) {
    cmd += files[i] + ' ';
  }

  // ---
  // loop through any options and add then up...
  // ---
  for(var directive in data.options) {
    cmd += grunt.helper('makeParam', data.options[directive], '--' + directive + '=', true);
  }

  // ---
  // check if output file is defined
  // ---
  if (data.output_file && data.output_file.length) {
    cmd += ' --output_file=' + data.output_file;
  }

  return cmd;
};

