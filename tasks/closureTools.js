/**
 * Bootstrap file
 *
 */

var localGrunt = require('grunt');

var cHelpers    = require('../lib/helpers.js'),
    cBuilder    = require('./closureBuilder'),
    cCompiler   = require('./closureCompiler'),
    cDepsWriter = require('./closureDepsWriter');

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
cTools.helpers = cHelpers;
cTools.builder = require('../lib/libBuilder');
cTools.compiler = require('../lib/libCompiler');
cTools.depsWriter = require('../lib/libDepsWriter');
cTools.closureOpts = require('../lib/closureOptions');
