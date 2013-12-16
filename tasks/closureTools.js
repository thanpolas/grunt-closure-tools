/**
 * Bootstrap file
 *
 */

var localGrunt = require('grunt');

var taskLib = require('task-closure-tools');

var cHelpers = taskLib.helpers;
var cBuilder = require('./closureBuilder');
var cCompiler = require('./closureCompiler');
var cDepsWriter = require('./closureDepsWriter');

var cTools = module.exports = function(grunt) {

  // register the rest of the tasks
  cBuilder(grunt);
  cCompiler(grunt);
  cDepsWriter(grunt);

};

// overwrite helper's logging methods
cHelpers.log = {
  warn: function(msg) { localGrunt.log.warn(msg); },
  info: function(msg) { localGrunt.log.writeln(msg); },
  error: function(msg) { localGrunt.log.error(msg); },
  debug: function(debug, msg) {
    if ( !debug ) return;
    localGrunt.log.writeln( 'debug :: '.blue + msg );
  }
};


// Expose internal API
cTools.helpers = taskLib.helpers;
cTools.builder = taskLib.builder;
cTools.compiler = taskLib.compiler;
cTools.depsWriter = taskLib.depsWriter;
cTools.closureOpts = taskLib.closureOpts;
