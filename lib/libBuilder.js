/*jshint camelcase:false */

var cHelpers = require('./helpers'),
    gruntMod = require('grunt');

// path to builder from closure lib path
var BUILDER = '/closure/bin/build/closurebuilder.py';

// the object we'll export.
var builder = {};

/**
 * Perform validations for given options
 *
 * @return {boolean} false if error
 */
builder.validate = function ( options )
{
  // check for closure lib path
  var libPath = options.closureLibraryPath;

  var builder;
  if (!libPath) {
    // check for direct assignment of builder script
    builder = options.builder;
    if (!builder) {
      cHelpers.log.error('closureLibraryPath'.red + ' or ' + 'builder'.red + ' properties are required');
      return false;
    }
  } else {
    builder = libPath + BUILDER;
  }

  builder = gruntMod.template.process(builder);

  // ---
  // validate builder existence
  // ---
  if (!gruntMod.file.isFile( builder )) {
    cHelpers.log.error('builder file/path not valid: ' + builder.red);
    return false;
  }

  // ---
  // Check for inputs or paths
  // ---
  var inputs = options.inputs;
  var namespaces = options.namespaces;
  if (0 === inputs.length && !namespaces) {
    cHelpers.log.error('src'.red + ' or ' + 'namespaces'.red +
      ' properties are required');
    return false;
  }

  return true;
};


/**
 * [validateFileObj description]
 * @param  {Object} options [description]
 * @param  {Object} fileObj [description]
 * @return {boolean}         [description]
 */
builder.validateFileObj = function ( options, fileObj ) {

  var root = gruntMod.file.expand(fileObj.src);
  if (!root || 0 === root.length) {
    cHelpers.log.error('src'.red + ' property is required');
    return false;
  }

  return true;
};


/**
 * Prepare and create the builder command to be shell executed.
 *
 * @param {Object} options
 * @param  {Object} fileObj [description]
 * @return {string|boolean} boolean false if we failed, command string if all ok
 */
builder.createCommand = function createCommand ( options, fileObj ) {

  var canCompile = false;

  // define the builder executable
  var builder = options.builder || options.closureLibraryPath + BUILDER;
  builder = gruntMod.template.process(builder);


  var cmd = builder + ' ';

  // check for inputs
  var inputs = options.inputs;
  console.log('INPUTS:', inputs);
  if (inputs && inputs.length) {
    cmd += cHelpers.makeParam( inputs, '-i', false, true);
  }
  console.log('PASSED');
  // check for namespaces
  if (options.namespaces && options.namespaces.length) {
    cmd += cHelpers.makeParam( options.namespaces, '-n' );
  }
  // append root
  var allRoots = gruntMod.file.expand( fileObj.src );
  cmd += cHelpers.makeParam( allRoots, '--root=', true, true);

  // check type of operation
  var op = options.output_mode || 'script';

  // see if we have compiler set, will override any operation
  if (options.compile) {
    // we got something, check if file is there...
    if ( !gruntMod.file.isFile( options.compilerFile ) ) {
      cHelpers.log.error('ERROR'.red + ' :: compiler .jar location not valid: ' + (options.compilerFile || 'undefined').red);
      return false;
    }

    // alright, we are compile on
    canCompile = true;
    op = 'compiled';
  }

  // set operation
  cmd += ' -o ' + op;

  // check if output file is defined
  var dest = fileObj.dest;
  if (dest && dest.length) {
    cmd += ' --output_file=' + gruntMod.template.process(dest);
  }

  // ---
  // if compile mode, start digging
  // ---
  if (canCompile) {
    cmd += ' --compiler_jar=' + options.compilerFile;

    // dive into all options
    var compileOpts = options.compilerOpts || {};

    // define options that may contain files that need expanding
    var expandDirectives = [
      'externs'
    ];

    for( var directive in compileOpts ) {

      // check for externs option and intercept with grunt file expand
      if (0 <= expandDirectives.indexOf( directive )) {
        compileOpts[directive] = gruntMod.file.expand( compileOpts[directive] );
      }

      // check for type of value and act accordingly
      if ( Array.isArray( compileOpts[directive] ) ) {

        // go through all values
        for (var i = 0, len = compileOpts[directive].length; i < len; i++) {
          cmd += ' --compiler_flags="--' + directive + '=' + compileOpts[directive][i] + '"';
        }
      } else if (null === compileOpts[directive]) {

        // value of directive is null, not required
        cmd += ' --compiler_flags="--' + directive + '"';
      } else {

        // value of directive is a string
        cmd += ' --compiler_flags="--' + directive + '=' + compileOpts[directive] + '"';
      }

    }
  }

  return cmd;
};


module.exports = builder;
