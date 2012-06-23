var grunt = require('grunt');

var closureTools = require('../tasks/closureTools');

closureTools.closureTools.testTask.run(grunt, {one:2, four: [1,2,3], zit:'one'});

exports['builder'] = {
  'todo': function(test) {
    test.ok(true);
    test.done();
  }
};

