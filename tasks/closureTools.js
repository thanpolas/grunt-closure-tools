/**
 * Copyright 2012 Thanasis Polychronakis.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * =======================
 *
 */

var TestTask = require('./testTask');

/**
 * The main constructor
 *
 * @constructor
 */
var ClosureTools = function()
{
  this.testTask = new TestTask();
};

var closureTools = new ClosureTools();



module.exports = function(grunt) {
  grunt.registerMultiTask('testTask', 'test', function(){
    closureTools.testTask.run.call(this, grunt);
  });
};

module.exports.closureTools = closureTools;
module.exports.C = ClosureTools;
    
