/*jshint camelcase:false */
/**
 * Copyright 2012 Thanasis Polychronakis.
 *
 * =======================
 *
 * closureBuilder.js Combines and optionally compiles javascript files
 *
 */


var cBuilder    = require('../lib/libBuilder'),
    cHelpers    = require('../lib/helpers.js');

module.exports = function( grunt ) {

  grunt.registerMultiTask('closureBuilder', 'Google Closure Library builder', function closureBuilder() {

    var builderDone = this.async();
    var options = this.options();

    //
    // Validations
    // - Check required parameters
    //
    if ( !cBuilder.validate( options )) {
      grunt.log.error( 'FAILED to run closureBuilder task.');
      return;
    }
    //
    // Prepare and compile the command string we will execute
    //
    // Iterate over all specified file groups.
    var commands = [], cmd,
        targetName = this.target;

    this.files.forEach(function(fileObj) {


      if ( !cBuilder.validateFileObj( options, fileObj )) {
        grunt.log.error('FAILED validations for target: ' + targetName.red);
        return;
      }

      cmd = cBuilder.createCommand( options, fileObj );

      if ( cmd ) {
        commands.push( {cmd: cmd, dest: targetName, fileObj: fileObj} );
      } else {
        grunt.log.error( 'FAILED to create command line for target: ' + targetName.red );
      }
    });


    if ( 0 === commands.length ) {
      grunt.log.error('No commands produced for shell execution. Check your config file');
      builderDone(false);
      return;
    }

    //
    // Execute the compile command on the shell.
    //
    //
    cHelpers.runCommands( Array.prototype.slice.call(commands, 0), function(state) {
      if ( !state ) {
        builderDone(false);
        return;
      }
      cHelpers.runStats( Array.prototype.slice.call(commands, 0), options, builderDone);
    });

  });
};
