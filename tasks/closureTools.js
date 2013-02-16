/**
 * Bootstrap file
 *
 */

var cHelpers    = require('./helpers.js'),
    cBuilder    = require('./closureBuilder'),
    cCompiler   = require('./closureCompiler'),
    cDepsWriter = require('./closureDepsWriter');

module.exports = function(grunt) {

  // if grunt is not provided, then expose internal API
  if ('object' !== typeof(grunt)) {
    return {
      helpers: cHelpers,
      builder: require('./libBuilder'),
      compiler: require('./libCompiler'),
      depsWriter: require('./libDepsWriter'),
      closureOpts: require('./closureOptions')
    };
  }

  // overwrite helper's logging methods
  cHelpers.log = {
    warn: function(msg) { grunt.log.warn(msg); },
    info: function(msg) { grunt.log.writeln(msg); },
    error: function(msg) { grunt.log.error(msg); },
    debug: function(debug, msg) {
      if ( !debug ) return;
      grunt.log.writeln( 'debug :: '.blue + msg );
    }
  };

  // register the rest of the tasks
  cBuilder(grunt);
  cCompiler(grunt);
  cDepsWriter(grunt);



};
