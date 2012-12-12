/**
 * Copyright 2012 Athanasios Polychronakis. Some Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * =======================
 *
 * helpers.js Helper functions for closure tools
 */



module.exports = function(grunt) {
  var exec = require('child_process').exec;
  var gzip = require('zlib').gzip;
  var fs = require('fs');

  /**
   * Generates a parameter to be concatenated to the shell command.
   * Will determine if given parameter is an array, a string or null and
   * takes proper action.
   *
   * @param {string|Array|null} param parameter to examine
   * @param {string} directive The directive (e.g. from -p path/to the '-p')
   * @param {boolean=} opt_noSpace set to true if no space is required after directive
   * @param {boolean=} opt_parsePath If true each param item will be handled as
   *                                 a path and parsed via grunt expandFiles.
   * @return {string} " -p path/to" or if array " -p path/one -p path/two [...]"
   *      in case param is null, we simply return the directire (" -p")
   */
  grunt.registerHelper('makeParam', function stringOrArray(param, directive
      , opt_noSpace, opt_parsePath) {

    // use space or not after directive
    var sp = (opt_noSpace ? '' : ' ');

    var paramValue = param;
    if (opt_parsePath) {
      paramValue = grunt.file.expandFiles(param);
    }

    if (Array.isArray(param)) {
      if (opt_parsePath){
        paramValue = [];
        for(var i = 0, len = param.length; i < len; i++) {
          paramValue.push(grunt.file.expand(param[i]));
        }
      }
      return ' ' + directive + sp + paramValue.join(' ' + directive + sp);
    } else if (null === param){
      return ' ' + directive;
    } else {
      return ' ' + directive + sp + String(paramValue);
    }
  });

  /**
   * Will shell execute the given command
   *
   * @param {string} command
   * @param {Function} done callback to call when done
   * @return {void}
   */
  grunt.registerHelper('executeCommand', function executeCommand(command, done){
    grunt.log.writeln('Executing: '.blue + command);
    exec(command, function execCB(err, stdout, stderr) {
      if (err) {
        grunt.warn(err);
        done(false);
      }
      grunt.log.writeln(stdout || stderr);
      done(true);
    });
  });


  /**
   * Generate stats for the compiled output file
   *
   * @param {string} filePath path to compiled file
   * @param {Function(string=)} fn Callback
   */
  grunt.registerHelper('generateStats', function genStats(filePath) {
    var src = grunt.file.read(filePath);
    var gzipSrc = grunt.helper('gzip', src);
    var gzipSize = gzipSrc.length;
    var compiledSize = src.length;
    var percent = String('-' + ((1 - (gzipSize / compiledSize)) * 100).toFixed(2) + '%');

    grunt.log.writeln('Compiled size:\t' + String((compiledSize / 1024).toFixed(2)).green +
      ' kb \t(' + String(compiledSize).green + ' bytes)');
    grunt.log.writeln('GZipped size:\t' + String((gzipSize / 1024).toFixed(2)).green +
      ' kb \t(' + String(gzipSize).green + ' bytes) ' + percent);

  });

  /**
   * Checks existence of a file (allows symlinks)
   *
   * @param {string} filePath path to check
   * @return {boolean} Wether the file exists.
   */
  grunt.registerHelper('fileExists', function fileExists(filePath) {
    try {
      var stat = fs.lstatSync(filePath);
      if (stat.isFile() || stat.isSymbolicLink())
        return true;
    } catch (e) {}
    return false;
  });
};