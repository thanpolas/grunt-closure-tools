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
 * closureCompiler.js Combines and optionally compiles javascript files
 *
 * Call from grunt as:
 */
 var gruntConfig = {
   closureCompiler:  {
     // any name that describes your task
     targerName: {
       // [Required] Path to closure compiler
       closureCompiler: 'path/to/closure/compiler.jar',

       // [Required] Target files to compile. Can be a string, an array of strings
       // or grunt file syntax (<config:...>, *)
       js: 'path/to/file.js',

       // [Optional] set an output file
       output_file: 'path/to/compiled_file.js',

       // [Optional] Set Closure Compiler Directives here
       options: {
         /**
          * Keys will be used as directives for the compiler
          * values can be strings or arrays.
          * If no value is required use null
          *
          * The directive 'externs' is treated as a special case
          * allowing a grunt file syntax (<config:...>, *)
          *
          * Following are some directive samples...
          */
          compilation_level: 'ADVANCED_OPTIMIZATIONS',
          externs: ['path/to/file.js', '/source/**/*.js'],
          define: ["'goog.DEBUG=false'"],
          warning_level: 'verbose',
          jscomp_off: ['checkTypes', 'fileoverviewTags'],
          summary_detail_level: 3,
          output_wrapper: '(function(){%output%}).call(this);'       
       }
     }
   }
 };
 

var fs = require('fs');


module.exports = function(grunt) {
  grunt.registerMultiTask('closureCompiler', 'Google Closure Library compiler', function() {

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
    // Prepare and compile the command string to execute
    //
    var command = compileCommand(grunt, params, data);

    if (false === command) {
      return false;
    }
    
    //
    // execute the task
    //
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
  // check for closure compiler file
  var compiler = data.closureCompiler;
  
  //
  // check compiler's existence
  // 
  var fileExists = false;
  try {
      if (fs.lstatSync(compiler).isFile()) {
        fileExists = true;
      }
  }
  catch (e) {}
  if (!fileExists) {
    grunt.log.error('ERROR'.red + ' :: compiler filepath not valid: ' + compiler.red);
    return false;
  }

  // 
  // Check for js files
  // 
  var js = grunt.file.expandFiles(data.js);
  if (0 === js.length) {
    grunt.log.warn('WARNING'.orange + ' :: ' + 'js'.red + ' files not defined');
  }
  

  
  // prep and return params object
  return {
    compiler: compiler,
    js: js,
    output_file: data.output_file
  };

};


/**
 * Prepare and compile the compiler command we will execute
 *
 * @param {grunt} grunt
 * @param {Object} params
 * @param {Object} data
 * @return {string|boolean} boolean false if we failed, command string if all ok
 */
function compileCommand(grunt, params, data)
{
  var cmd = 'java -jar ' + params.compiler + ' ';

  //
  // check for js files
  //
  var js = grunt.file.expandFiles(params.js);
  if (0 < js.length) {
    cmd += grunt.helper('makeParam', js, '--js');
  }  

  // make it easy for our checks, create an options object if
  // it's not there
  data.options || (data.options = {});

  // check if output file is defined
  if (params.output_file && params.output_file.length) {
    cmd += ' --js_output_file=' + params.output_file;
  }

  //
  // start digging on options
  //
  var opts = data.options;
  for(var directive in opts) {
    // look for 'externs' special case
    if ('externs' == directive) {
      opts[directive] = grunt.file.expandFiles(opts[directive]);
    }
    cmd += grunt.helper('makeParam', opts[directive], '--' + directive);
  }

  return cmd;
};

