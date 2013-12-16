/**
 * Copyright 2012 Thanasis Polychronakis. Some Rights Reserved.
 *
 * =======================
 *
 * closureBuilder.js Combines and optionally compiles javascript files
 *
 */

var taskLib = require('task-closure-tools');
var cDepsWriter = taskLib.depsWriter;
var cHelpers = taskLib.helpers;

module.exports = function(grunt) {
  grunt.registerMultiTask('closureDepsWriter', 'Google Closure Library Dependency Calculator script', function() {

    // Tell grunt this task is asynchronous.
    var compileDone = this.async();

    var options = this.options();

    if ( !cDepsWriter.validate( options ) ) {
      grunt.log.error('closureDepsWriter Task Failed');
      return;
    }

    // Iterate over all specified file groups.
    var commands = [], cmd,
        targetName = this.target,
        hadFile = false;

    function createCommand( fileObj ) {
      hadFile = true;
      cmd = cDepsWriter.createCommand( options, fileObj );

      if ( cmd ) {
        commands.push( {cmd: cmd, dest: targetName} );
      } else {
        grunt.log.error( 'FAILED to create command line for target: ' + targetName.red );
      }
    }

    this.files.forEach( createCommand );

    if ( !hadFile ) {
      createCommand( {} );
    }

    if ( 0 === commands.length ) {
      grunt.log.error('No commands produced for shell execution. Check your config file');
      compileDone(false);
      return;
    }

    // release the kraken!
    cHelpers.runCommands( commands, compileDone, false, options.execOpts );

  });

};
