

var TestTask = function()
{
  this.params = null;
  this.cb = null;
};

TestTask.prototype.run = function(grunt, opt_data)
{
  this.params = this.data || opt_data;
  this.cb = (this.async && this.async()) || function(){};
  
  grunt.log.writeflags(this.params);
  console.log('helllo');
  
  this.cb(true);
};

module.exports = TestTask;
