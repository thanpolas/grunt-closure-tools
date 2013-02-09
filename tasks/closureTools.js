/**
 * Bootstrap file
 *
 */

var cHelpers    = require('./helpers.js'),
    cBuilder    = require('./closureBuilder'),
    cCompiler   = require('./closureCompiler'),
    cDepsWriter = require('./closureDepsWriter');

module.exports = function(grunt) {

  // overwrite helper's logging methods
  cHelpers.log = {
    warn: function(msg) { grunt.log.warn(msg); },
    info: function(msg) { grunt.log.writeln(msg); },
    error: function(msg) { grunt.log.error(msg); }
  };

  // register the rest of the tasks
  cBuilder(grunt);
  cCompiler(grunt);
  cDepsWriter(grunt);

};
