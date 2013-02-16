'use strict';

var grunt = require('grunt'),
    sinon = require('sinon'),
    configs = require('../fixtures/configs'),
    builder = require('../../lib/libBuilder');


/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

var stubIsFile;

exports.builder = {
  setUp: function(done) {
    stubIsFile = sinon.stub( grunt.file, 'isFile' );
    stubIsFile.returns( true );
    done();
  },
  tearDown: function(done) {
    stubIsFile.restore();
    done();
  },
  default_options: function( test ) {
    test.expect(1);

    var actual = builder.createCommand( configs.builder.withCompileOpts,
      configs.builder.withCompileFileObj );

    var expected = grunt.file.read('test/builder/expected/default_options');
    test.equal(actual, expected, 'Should be equal');

    test.done();
  }
};
