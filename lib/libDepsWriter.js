
var cHelpers = require('./helpers'),
    gruntMod = require('grunt');

// path to depswriter from closure lib path
var DEPSWRITER = '/closure/bin/build/depswriter.py';


var depsWriter = {};

/**
 * Perform validations for given options
 *
 * @return {boolean|Object} false if error
 */
depsWriter.validate = function validate( options )
{
  // ---
  // check depsExec existence
  // ---
  // check for closure lib path
  var libPath = options.closureLibraryPath,
      depsExec;
  if (!libPath) {
    // check for direct assignment of depswriter script
    depsExec = options.depswriter;
    if (!depsExec) {
      cHelpers.log.error('One of ' + 'closureLibraryPath'.red + ' or ' + 'depswriter'.red + ' properties are required');
      return false;
    }
  } else {
    depsExec = libPath + DEPSWRITER;
  }
  depsExec = gruntMod.template.process(depsExec);
  if (!gruntMod.file.isFile( depsExec )) {
    cHelpers.log.error('depswriter file/path not valid: ' + depsExec.red);
    return false;
  }

  return true;
};


/**
 * Prepare and compile the depswriter command we will execute
 *
 * @param  {Object} options The options.
 * @param  {Object} fileObj The (grunt) file object.
 * @return {string|boolean} boolean false if we failed, command string if all ok
 */
depsWriter.createCommand = function createCommand( options, fileObj ) {

  // define the depsWriter executable
  var depsExec = options.depswriter || options.closureLibraryPath + DEPSWRITER;
  depsExec = gruntMod.template.process( depsExec );
  var cmd = 'python ' + depsExec + ' ';
  //
  // Check for root, root_with_prefix and path_with_depspath options
  //
  var directives = ['root', 'root_with_prefix', 'path_with_depspath'],
      directive = directives.shift();
  while(directive) {
    if ( options.hasOwnProperty(directive) ) {
      cmd += cHelpers.makeParam( options[directive], '--' + directive + '=', true);
    }
    directive = directives.shift();
  }

  // ---
  // check if output file is defined
  // ---
  var dest = fileObj.dest;
  if (dest && dest.length) {
    gruntMod.file.write(dest, ''); // create the file if it's not there.
    cmd += ' --output_file=' + gruntMod.template.process(dest);
  }

  // ---
  // Check for file targets...
  // ---
  var files = gruntMod.file.expand(fileObj.src || {});
  for (var i = 0, len = files.length; i < len; i++) {
    cmd += ' ' + files[i];
  }

  return cmd;
};

module.exports = depsWriter;

