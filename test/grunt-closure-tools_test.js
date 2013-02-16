var grunt = require('grunt');

var tests = {};
var tmp = 'temp/',
    fixtures = 'test/expected/';

tests.builder = {
  'script output, bundling': function(test) {
    test.expect(1);

    var buildFile = 'build.bundled.js';
    var actual = grunt.file.read(tmp + buildFile);
    var expected = grunt.file.read(fixtures + buildFile);
    test.equal( actual,  expected, 'task output should equal: ' + buildFile);

    test.done();
  },
  'compiled output': function(test) {
    test.expect(1);

    var buildFile = 'build.compiled.js';
    var actual = grunt.file.read(tmp + buildFile);
    var expected = grunt.file.read(fixtures + buildFile);
    test.equal( actual,  expected, 'task output should equal: ' + buildFile);

    test.done();
  }

};

tests.compiler = {
  'generated file': function( test ) {
    test.expect(1);

    var compiledFile = 'compiler.compiled.js';
    var actual = grunt.file.read(tmp + compiledFile);
    var expected = grunt.file.read(fixtures + compiledFile);
    test.equal( actual,  expected, 'task output should equal: ' + compiledFile);

    test.done();
  }
};

tests.deps = {
  'deps file generation': function(test) {
    test.expect(1);

    var depsFile = 'deps.js';
    var actual = grunt.file.read(tmp + depsFile);
    var expected = grunt.file.read(fixtures + depsFile);
    test.equal( actual,  expected, 'task output should equal: ' + depsFile);

    test.done();
  }

};




module.exports = tests;
