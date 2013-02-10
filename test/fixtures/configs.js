/*jshint camelcase:false */
var configs = {
  builder: {}
};

var CLOSURE_COMPILER = 'path/to/compiler.jar',
    CLOSURE_BUILDER = 'path/to/builder.py';


configs.builder.withCompileOpts = {
  builder: CLOSURE_BUILDER,
  inputs: 'path/to/inputs',
  compile: true,
  compilerFile: CLOSURE_COMPILER,
  compilerOpts: {
    compilation_level: 'WHITESPACE_ONLY',
    jscomp_off: [
      'checkTypes',
      'strictModuleDepCheck'
    ]

  }
};
configs.builder.withCompileFileObj = {
  src: ['/path/to/source1', 'path/source2']
};

module.exports = configs;
